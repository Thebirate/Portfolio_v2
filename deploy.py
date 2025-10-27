import subprocess
import sys

# --- Configuration ---
# Set the main branches for the script
DEV_BRANCH = "development"
MAIN_BRANCH = "main"

# --- Helper Functions ---

def run_command(command, fail_on_error=True):
    """Executes a shell command and prints the output."""
    try:
        # Check=True will raise an error if the command fails
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
            print("Please resolve the conflict(s) manually in your code editor.")
        
        if fail_on_error:
            sys.exit(1)
        return None
    except FileNotFoundError:
        print(f"❌ Error: Git command not found. Ensure Git is installed and in your PATH.")
        sys.exit(1)

def commit_changes(commit_message):
    """Stages and commits local changes."""
    print("\n--- 1. Staging and Committing Changes ---")
    
    # Stage all unstaged changes
    run_command("git add .")
    
    # Perform the commit with the user's message
    run_command(f'git commit -m "{commit_message}"')
    print(f"👍 Changes successfully committed locally with message: '{commit_message}'")

def deploy_to_dev():
    """Implements Steps 1-4: Commit, push to development, trigger DEV deployment."""
    print("\n--- 2. Deploying to Development Environment (Staging) ---")
    
    # Checkout development branch
    run_command(f"git checkout {DEV_BRANCH}")
    
    # Push the latest development code (Triggers CI/CD Job: deploy-dev)
    run_command(f"git push origin {DEV_BRANCH}")
    print("\n🚀 Development branch pushed.")
    print("Action 4 Complete: Check GitHub Actions for DEV deployment (e.g., dev.xasan.net).")

def merge_and_deploy_to_prod():
    """Implements Steps 6-7: Merge to main, push to main, trigger PROD deployment."""
    print("\n--- 3. Merging to Main and Deploying to Production ---")

    # Checkout main
    run_command(f"git checkout {MAIN_BRANCH}")
    
    # Pull the latest remote main to prevent divergence/rollbacks
    run_command(f"git pull origin {MAIN_BRANCH}")
    
    # Merge development into main
    print(f"🔄 Merging changes from '{DEV_BRANCH}' into '{MAIN_BRANCH}'...")
    run_command(f"git merge {DEV_BRANCH}")
    
    # Push the updated main to remote (Triggers CI/CD Job: deploy-prod)
    run_command(f"git push origin {MAIN_BRANCH}")
    print("\n🎉 Main branch pushed (Action 7 Complete).")
    print("⚠️ WARNING: PROD deployment triggered and is awaiting manual approval on GitHub.")
    
    # Switch back to development for continued work
    run_command(f"git checkout {DEV_BRANCH}")


def automated_menu():
    """Main function to guide the user through the process."""
    print("="*60)
    print("Cloud CI/CD Workflow Automation Tool")
    print("="*60)
    
    # --- Check for Changes ---
    status_output = run_command("git status --porcelain", fail_on_error=False)
    if not status_output:
        print("⚠️ Warning: No unstaged or modified files found.")
    
    # --- Get Commit Message ---
    commit_text = input("\n📝 Enter the commit message for these changes:\n> ")
    if not commit_text.strip():
        print("❌ Commit message cannot be empty. Script terminated.")
        sys.exit(1)
        
    # Commit changes before proceeding
    commit_changes(commit_text)


    # --- Menu Selection ---
    print("\n" + "="*60)
    print("Choose the next action:")
    print(f"  1) Deploy to DEV (Push to {DEV_BRANCH}) - Go to Step 4")
    print(f"  2) Promote to PROD (Merge to {MAIN_BRANCH}) - Go to Step 6")
    print("  3) Exit")
    print("="*60)
    
    choice = input("Enter option number (1, 2, or 3): ")

    if choice == '1':
        deploy_to_dev()
    elif choice == '2':
        merge_and_deploy_to_prod()
    elif choice == '3':
        print("\nDeployment cancelled.")
    else:
        print("\nInvalid choice. Please run the script again.")
        
    print("\n--- Process Finished ---")

if __name__ == "__main__":
    automated_menu()