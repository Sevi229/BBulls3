
const forwarderOrigin = 'http://localhost:3001';
var accountE = "";
// sending.js


const initialize = () => {
    const connectButton = document.getElementById('connectWallet');
    const { ethereum } = window;

    const onboardMetaMaskClient = async () => {
        if (!isMetamaskInstalled()) {
            // prompt the user to install it
            console.log("MetaMask is not installed :(");
            connectButton.value = "Install Metamask";
            localStorage.setItem('accountE', '');
            connectButton.onclick = installMetaMask;
        } else {
            console.log("MetaMask is installed Hurray!!!!!");
            localStorage.setItem('accountE', '');
            connectButton.onclick = connectMetaMask;
        }
    }
  
    const connectMetaMask = async () => {
        connectButton.disabled = true;
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("accounts: ", JSON.stringify(accounts[0]));
            // Save JSON string to localStorage

            accountE = JSON.stringify(accounts[0]);
            console.log("German"+ accountE.toString());
            highlightTableRow(accountE);
             localStorage.setItem('accountE', accountE);
            
             connectButton.value = "🟢 Connected";
            
            
    
           
           

            

            connectButton.disabled = false;
        } catch (err) {
            console.error("Error occurred while connecting to MetaMask: ", err);
            connectButton.disabled = false;
            localStorage.setItem('accountE', '');
            connectButton.onclick = connectMetaMask; // Allow retrying the connection
            // Set accountE value as an empty string in localStorage
            

        }
    }
    

    const isMetamaskInstalled = () => {
        return ethereum && ethereum.isMetaMask;
    }

    const installMetaMask = () => {
        const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
        connectButton.value = "Install Metamask";
        connectButton.disabled = true;
        onboarding.startOnboarding();
    }

    onboardMetaMaskClient();
};

function highlightTableRow(accountE) {
    console.log("Your Account" + accountE)
    var accounts = accountE.slice(1, -1);

    const table = document.getElementById("leaderboard-table");
    const rows = table.getElementsByTagName("tr");


    for (let i = 0; i < rows.length -1; i++) { // Start from index 1 to skip the table header row
      const cell = rows[i].getElementsByTagName("td")[2];
      const cellText = cell.textContent;
   
      
      if (cellText.toString() === accounts) {
        rows[i].style.backgroundColor = "#fcc602";}
        else{
        rows[i].style.backgroundColor = "";
       }
       

        
      }
    }
  

document.addEventListener('DOMContentLoaded', initialize);


