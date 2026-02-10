let wallets = [];

async function connectWallet() {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);

  const address = accounts[0];
  if (!wallets.includes(address)) {
    wallets.push(address);
    displayWallets();
    getBalance(provider, address);
  }
}

async function getBalance(provider, address) {
  const balance = await provider.getBalance(address);
  console.log(
    address,
    ethers.formatEther(balance),
    "ETH"
  );
}

function displayWallets() {
  const list = document.getElementById("walletList");
  list.innerHTML = "";

  wallets.forEach(w => {
    const li = document.createElement("li");
    li.textContent = w;
    list.appendChild(li);
  });
}
