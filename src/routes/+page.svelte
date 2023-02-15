<script>
	import GuestsTable from "../lib/GuestsTable.svelte";

</script>
<main>
  <div class="header">
    <h1>Digital Guest Book</h1>
    <div class="profile">
      <img src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="">
      <p>Admin</p>
    </div>
  </div>
  <div class="container">
    <div class="menu">
      <button>Add Guest</button>
      <a href="/scanner"><button>Scan QR-Code</button></a>
      <button>Export to Excel</button>
      <button>Export to PDF</button>
    </div>
    <GuestsTable/>
  </div>
</main>


<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    background-color: whitesmoke;
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 2.5rem;
  }

  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .profile img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 100%;
  }

  .container {
    margin-top: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .menu button {
    border-radius: 5px; /* adjust the value as needed */
    padding: 8px 20px;
    background-color: #70A9C4;
    color: #fff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out; /* add transition property */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .menu button:hover {
    transform: scale(1.1); /* add hover scale animation */
  }


</style>