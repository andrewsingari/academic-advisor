function addReview() {
    const reviewText = document.getElementById('reviewText').value;

    const formData = new FormData();
    formData.append('reviewText', reviewText);

    fetch('addReview.php', {
        method: 'POST',
        body: formData
    }).then(response => response.text())
    .then(data => {
        alert('Review Added!');
        loadReviews();
    });
}

function loadReviews() {
    fetch('getReviews.php')
        .then(response => response.json())
        .then(data => {
            const reviewsDiv = document.getElementById('reviews');
            reviewsDiv.innerHTML = '<h2>Reviews for CMPT113</h2>';
            data.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review';
                reviewElement.innerHTML = `<p>${review.review_text}</p>`;
                reviewsDiv.appendChild(reviewElement);
            });
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
});
