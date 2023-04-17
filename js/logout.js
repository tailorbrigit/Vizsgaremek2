function logout(){
    const server = 'http://localhost:8000/api/';
    
    let endpoint = "logout"
        let url = server + endpoint;
    fetch((url), {
        method: 'post',
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        if (response.ok) {
          localStorage.removeItem(token);
          window.location.href = '../login.html';
        } else {
          console.log("sikertelen");
        }
      })
      .catch(error => {
        console.error(error);
      });

}
