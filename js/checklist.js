// form submission for each section
function saveSection(section) {
    const form = document.getElementById(`${section}-form`);
    if (form) {
        const formData = new FormData(form);
        fetch('addChecklist.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log(`${section} saved successfully`);
                alert('Courses saved successfully');
                location.reload(); // Refresh the page to show the updated data
            } else {
                console.error('Error saving courses');
                alert('Error saving courses');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        console.error(`Form with ID ${section}-form not found`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ['core', 'required', 'ancillary', 'elective'].forEach(section => {
        fetchSectionData(section);
    });
});

function fetchSectionData(section) {
    const endpoint = `getChecklist.php?section=${section}`;
    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector(`#${section}-requirements .input-rows`);
        tableBody.innerHTML = ''; // Clear existing rows

        // Populate table 
        data.forEach(course => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = course.course_name;
            row.insertCell(1).textContent = course.course_description;
            row.insertCell(2).textContent = course.semester_hours;
        });

        const numberOfRowsToAdd = Math.max(5 - data.length, 1); // Ensure at least one empty row
        for (let i = 0; i < numberOfRowsToAdd; i++) {
            const row = tableBody.insertRow();
            row.insertCell(0).innerHTML = '<input type="text" placeholder="course name" name="course_name[]">';
            row.insertCell(1).innerHTML = '<input type="text" placeholder="course description" name="course_description[]">';
            row.insertCell(2).innerHTML = '<input type="number" placeholder="s.h" name="semester_hours[]" class="semester-hours-input">';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchAndDisplayTotalHours(section) {
    fetch(`getTotalHours.php?section=${section}`)
        .then(response => response.json())
        .then(data => {
            const totalHoursElement = document.getElementById(`${section}-total-hours`);
            if (totalHoursElement) {
                totalHoursElement.textContent = data.totalSemesterHours;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = ['core', 'required', 'ancillary', 'elective'];
    sections.forEach(section => {
        fetchSectionData(section);  data
        fetchAndDisplayTotalHours(section); // fetch and display total hours
    });
});

