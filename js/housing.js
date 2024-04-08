document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('listingForm');
    var listingsContainer = document.getElementById('listingsContainer');

    form.onsubmit = function (e) {
        e.preventDefault();

        var formData = new FormData(form);
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'addHousingListing.php', true);
        xhr.onload = function () {
            if (this.status == 200) {
                alert('Listing added successfully');
                form.reset();
                fetchListings();  // Refresh listings 
            } else {
                alert('Error adding listing');
            }
        };
        xhr.send(formData);
    };

    function fetchListings() {
        fetch('getHousingListings.php')
            .then(response => response.json())
            .then(data => {
                listingsContainer.innerHTML = '';
                data.forEach(listing => {
                    var div = document.createElement('div');
                    div.innerHTML = `
                        <h2>${listing.title}</h2>
                        <p>Price: ${listing.price}</p>
                        <p>Address: ${listing.address}</p>
                        <p>Location: ${listing.location}</p>
                        <p>Username: ${listing.username}</p>
                    `;
                    listingsContainer.appendChild(div);
                });
            })
            .catch(error => console.error('Error fetching listings:', error));
    }

    fetchListings();
});
