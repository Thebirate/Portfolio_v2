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
        print(f"✅ Success: {command.split()[0]}")
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"❌ Error executing command: {command}")
        print(f"STDOUT: {e.stdout}")
        print(f"STDERR: {e.stderr}")
        
        if "conflict" in e.stderr.lower():
            print("\n⚠️ MANUAL INTERVENTION REQUIRED: Git Merge Conflict Detected!")
            print("Please resolve the conflict(s) manually in your code editor before rerunning.")
        
        if fail_on_error:
            sys.exit(1)
        return None
    except FileNotFoundError:
        print(f"❌ Error: Git command not found. Ensure Git is installed and in your PATH.")
        sys.exit(1)

def commit_changes(commit_message):
    """Stages and commits local changes."""
    print("\n--- Staging and Committing Changes ---")
    run_command("git add .")
    # Using fail_on_error=False because 'git commit' fails if there are no new changes, but we want to proceed.
    run_command(f'git commit -m "{commit_message}"', fail_on_error=False) 
    print(f"👍 Changes successfully committed locally.")

def push_to_dev():
    """Pushes the current branch's latest commit to the remote DEV branch."""
    print(f"\n--- Pushing to {DEV_BRANCH} (DEV Deployment Trigger) ---")
    run_command(f"git checkout {DEV_BRANCH}")
    run_command(f"git push origin {DEV_BRANCH}")
    print("\n🚀 DEV deployment triggered. Check GitHub Actions for DEV environment status.")

def merge_and_push_to_prod():
    """Merges DEV into MAIN and pushes, triggering the PROD deployment."""
    print(f"\n--- Merging to {MAIN_BRANCH} (PROD Deployment Trigger) ---")

    # 1. Ensure local main is current
    run_command(f"git checkout {MAIN_BRANCH}")
    run_command(f"git pull origin {MAIN_BRANCH}")
    
    # 2. Merge development into main
    print(f"🔄 Merging changes from '{DEV_BRANCH}' into '{MAIN_BRANCH}'...")
    run_command(f"git merge {DEV_BRANCH}")
    
    # 3. Push the updated main to remote
    run_command(f"git push origin {MAIN_BRANCH}")
    print("\n🎉 PROD push complete.")
    print("⚠️ WARNING: Deployment triggered and is awaiting **manual approval** on GitHub.")
    
    # 4. Switch back to development
    run_command(f"git checkout {DEV_BRANCH}")


def automated_menu():
    """Main function to guide the user through the deployment choices."""
    print("="*60)
    print("Cloud CI/CD Workflow Automation Tool")
    print("="*60)
    
    # --- Commit/Input Phase ---
    commit_text = input("\n📝 Enter the commit message for these changes:\n> ")
    if not commit_text.strip():
        print("❌ Commit message cannot be empty. Script terminated.")
        sys.exit(1)
        
    commit_changes(commit_text)
    
    # --- Menu Selection Phase ---
    print("\n" + "="*60)
    print("Choose the next deployment action:")
    print(f"  1) Deploy to DEV (Push ONLY to {DEV_BRANCH}) - For testing/QA.")
    print(f"  2) Release to PROD (Push to {DEV_BRANCH}, then Merge to {MAIN_BRANCH}) - Full release sequence.")
    print("  3) Exit")
    print("="*60)
    
    choice = input("Enter option number (1, 2, or 3): ")

    if choice == '1':
        # Option 1: Commit, Push to DEV, STOP
        push_to_dev()
        print("\n--- Deployment Sequence 1 Finished ---")
    
    elif choice == '2':
        # Option 2: Commit, Push to DEV, Merge to MAIN, Push to MAIN
        
        # 1. Push to DEV (ensures remote DEV is up-to-date)
        push_to_dev()
        
        print("\n*** ACTION PAUSED FOR QA ***")
        input("Press ENTER to confirm testing is complete and begin PROD promotion...")
        
        # 2. Merge to Main
        merge_and_push_to_prod()
        
        print("\n--- Deployment Sequence 2 Finished ---")

    elif choice == '3':
        print("\nDeployment cancelled.")
    else:
        print("\nInvalid choice. Please run the script again.")
        
    print("\nLocal branch reset to 'development' for continuous work.")

if __name__ == "__main__":
    automated_menu()