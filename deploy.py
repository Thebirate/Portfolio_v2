import subprocess
import sys

# --- Configuration ---
DEV_BRANCH = "development"
MAIN_BRANCH = "main"

# --- Helper Functions ---

def run_command(command, fail_on_error=True):
    """Executes a shell command and prints the output."""
    try:
        result = subprocess.run(
            command, 
            shell=True, 
            check=True,
            capture_output=True, 
            text=True
        )
        # Only print success message for non-trivial commands
        if not command.startswith("git status"):
            print(f"✅ Success: {command.split()[0]}")
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"❌ Error executing command: {command}")
        print(f"STDOUT: {e.stdout}")
        print(f"STDERR: {e.stderr}")
        
        if "conflict" in e.stderr.lower():
            print("\n⚠️ MANUAL INTERVENTION REQUIRED: Git Merge Conflict Detected!")
            print("Please resolve the conflict(s) manually in your code editor.")
        
        if fail_on_error:
            sys.exit(1)
        return None
    except FileNotFoundError:
        print(f"❌ Error: Git command not found. Ensure Git is installed and in your PATH.")
        sys.exit(1)

def perform_commit():
    """Prompts for message and executes commit, allowing user to skip."""
    status_output = run_command("git status --porcelain", fail_on_error=False)
    has_changes = bool(status_output)
    
    if not has_changes:
        print("⚠️ Warning: No unstaged or modified files found.")
        
    print("\n" + "="*60)
    print("Action 1: Commit Local Changes (Necessary before deploying)")
    print("="*60)
    
    choice = input("Do you need to commit new local changes? (y/n) [n]: ")
    
    if choice.lower() == 'y':
        # --- Perform Commit ---
        commit_text = input("\n📝 Enter the commit message for these changes:\n> ")
        if not commit_text.strip():
            print("❌ Commit message cannot be empty. Returning to menu.")
            return False

        print("\n--- Staging and Committing Changes ---")
        run_command("git add .")
        # Fail_on_error=True will catch errors if the commit fails for other reasons
        run_command(f'git commit -m "{commit_text}"') 
        print(f"👍 Changes successfully committed locally.")
        return True
    else:
        print("Skipping commit phase. Proceeding to deployment menu...")
        return True

# [The deploy_to_dev and merge_and_deploy_to_prod functions remain the same]

def deploy_to_dev():
    # ... (content remains the same)
    print("\n--- 2. Deploying to Development Environment (Staging) ---")
    run_command(f"git checkout {DEV_BRANCH}")
    run_command(f"git push origin {DEV_BRANCH}")
    print("\n🚀 Development branch pushed.")
    print("Action 4 Complete: Check GitHub Actions for DEV deployment (e.g., dev.xasan.net).")

def merge_and_deploy_to_prod():
    # ... (content remains the same)
    print("\n--- 3. Merging to Main and Deploying to Production ---")
    run_command(f"git checkout {MAIN_BRANCH}")
    run_command(f"git pull origin {MAIN_BRANCH}")
    print(f"🔄 Merging changes from '{DEV_BRANCH}' into '{MAIN_BRANCH}'...")
    run_command(f"git merge {DEV_BRANCH}")
    run_command(f"git push origin {MAIN_BRANCH}")
    print("\n🎉 Main branch pushed (Action 7 Complete).")
    print("⚠️ WARNING: PROD deployment triggered and is awaiting manual approval on GitHub.")
    run_command(f"git checkout {DEV_BRANCH}") # Switch back

def automated_menu():
    """Main function to guide the user through the process."""
    print("="*60)
    print("Cloud CI/CD Workflow Automation Tool")
    print("="*60)
    
    # --- Check and Commit Phase ---
    commit_succeeded = perform_commit()
    
    if not commit_succeeded:
        # If the user decided not to commit, the script stops here
        print("\nProcess cancelled by user during commit phase.")
        return

    # --- Menu Selection ---
    while True:
        print("\n" + "="*60)
        print("Deployment Action Menu:")
        print(f"  1) Deploy to DEV (Push to {DEV_BRANCH}) - Go to Step 4")
        print(f"  2) Promote to PROD (Merge to {MAIN_BRANCH}) - Go to Step 6")
        print("  3) Exit")
        print("="*60)
        
        choice = input("Enter option number (1, 2, or 3): ")

        if choice == '1':
            deploy_to_dev()
            break
        elif choice == '2':
            merge_and_deploy_to_prod()
            break
        elif choice == '3':
            print("\nDeployment cancelled by user.")
            break
        else:
            print("\nInvalid choice. Please enter 1, 2, or 3.")
            
    print("\n--- Process Finished ---")

if __name__ == "__main__":
    automated_menu()