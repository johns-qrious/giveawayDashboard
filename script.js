// Sample data
let upcomingGiveaways = [
    { id: 1, eventName: "SZA", dateTime: "2023-04-01T12:00", tickets: 2, ballotStatus: "Open", ballotRunDate: "2023-03-15" },
    { id: 2, eventName: "The Weeknd", dateTime: "2023-04-15T18:00", tickets: 2, ballotStatus: "Closed", ballotRunDate: "2023-04-10" }
];

let pastGiveaways = [
    { id: 3, eventName: "James Taylor", dateTime: "2022-11-15T18:00", tickets: 4, ballotStatus: "Completed", ballotRunDate: "2022-11-10" },
    { id: 4, eventName: "50 Cent", dateTime: "2022-10-20T14:30", tickets: 2, ballotStatus: "Completed", ballotRunDate: "2022-10-15" }
];

// Function to format date and time
function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    return date.toLocaleString('en-GB', options);
}

// Function to populate table with data
function populateTable(tableId, data) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.eventName}</td>
            <td>${formatDateTime(item.dateTime)}</td>
            <td>${item.tickets}</td>
            <td>${item.ballotStatus}</td>
            <td>${formatDateTime(item.ballotRunDate)}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-btn" data-id="${item.id}">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listener for edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const giveawayId = button.getAttribute('data-id');
            const giveaway = data.find(item => item.id == giveawayId);
            populateEditForm(giveaway);
            $('#editModal').modal('show');
        });
    });
}

// Function to populate edit form with giveaway details
function populateEditForm(giveaway) {
    document.getElementById('editId').value = giveaway.id;
    document.getElementById('editEventName').value = giveaway.eventName;
    document.getElementById('editDateTime').value = giveaway.dateTime;
    document.getElementById('editTickets').value = giveaway.tickets;
    document.getElementById('editBallotStatus').value = giveaway.ballotStatus;
    document.getElementById('editBallotRunDate').value = giveaway.ballotRunDate;
}

// Function to handle form submission
$(document).ready(function() {
    $('#editForm').submit(function(e) {
        e.preventDefault();
        const id = $('#editId').val();
        const eventName = $('#editEventName').val();
        const dateTime = $('#editDateTime').val();
        const tickets = $('#editTickets').val();
        const ballotStatus = $('#editBallotStatus').val();
        const ballotRunDate = $('#editBallotRunDate').val();

        // Update data in upcoming giveaways
        let index = upcomingGiveaways.findIndex(item => item.id == id);
        if (index !== -1) {
            upcomingGiveaways[index] = { id, eventName, dateTime, tickets, ballotStatus, ballotRunDate };
        }

        // Update data in past giveaways
        index = pastGiveaways.findIndex(item => item.id == id);
        if (index !== -1) {
            pastGiveaways[index] = { id, eventName, dateTime, tickets, ballotStatus, ballotRunDate };
        }

        // Repopulate tables
        populateTable('upcoming-body', upcomingGiveaways);
        populateTable('past-body', pastGiveaways);

        // Hide modal
        $('#editModal').modal('hide');
    });
});

// Initial population of tables
populateTable('upcoming-body', upcomingGiveaways);
populateTable('past-body', pastGiveaways);
