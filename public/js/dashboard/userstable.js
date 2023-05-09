let temp_email = ''
async function saveData(email) {
  const dialog = document.querySelector('.datatable-edit-modal')
  let value = document.getElementById('inputField-email-datatable').value
  dialog.close()
  console.log(email)
  const update_response = await fetch('/dashboard/update-learners-data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ condition: { email: email }, updatedata: { email: value } })
  })
  document.getElementById('datatable-save-edit-button').removeEventListener('click', saveData)
  document.getElementById('inputField-email-datatable').value = ''
  return await update_response.json()
  // Remove the event listener for the save button
}

async function showEditModal(email) {
  const dialog = document.querySelector('.datatable-edit-modal')
  dialog.showModal()
  if (!document.getElementById('datatable-save-edit-button').hasAttribute('data-listener-added')) {
    document.getElementById('datatable-save-edit-button').addEventListener('click', async () => {
      const update_res_data = await saveData(temp_email)
      if (update_res_data.changes.status == 'success') {
        document.getElementById('datatable-edit-success-alert').showModal()
        setTimeout(function () {
          document.getElementById('datatable-edit-success-alert').close()
          //reloadPage()
        }, 1500)
      } else if (update_res_data.changes.status == 'fail') {
        // get the element
        const alertDiv = document.getElementById('datatable-edit-fail-alert')

        // create the HTML element to append
        const alertMessage = document.createElement('h4')
        alertMessage.innerHTML =
          'Reason : ' +
          update_res_data.changes.reason +
          '<br>' +
          'Action : ' +
          update_res_data.changes.action

        // append the element to the alert div--
        const temp = alertDiv.innerHTML
        alertDiv.appendChild(alertMessage)

        // remove the appended element after 3 seconds
        setTimeout(() => {
          alertDiv.innerHTML = temp
        }, 2100)
        document.getElementById('datatable-edit-fail-alert').showModal()
        setTimeout(function () {
          document.getElementById('datatable-edit-fail-alert').close()
          //reloadPage()
        }, 2100)
      }
    })
    document
      .getElementById('datatable-save-edit-button')
      .setAttribute('data-listener-added', 'true')
  }
}
document.getElementById('datatable-cancel-edit-button').addEventListener('click', function () {
  const dialog = document.querySelector('.datatable-edit-modal')
  dialog.close()
  document.getElementById('datatable-save-edit-button').removeEventListener('click', saveData)
})
const datatable_learners_grid = new gridjs.Grid({
  columns: [
    'Name',
    'Email',
    'Activity',
    {
      name: 'Change Email',
      formatter: (_, row) =>
        gridjs.html(
          `<button type="button" class="edit-button-datatable text-nowrap" data-bs-target="#admin-accounts-edit-modal" data-bs-toggle="modal" data-email="${row.cells[1].data}">Edit</button>`
        )
    }
  ],
  fixedHeader: true,

  pagination: {
    limit: 5,
    server: {
      url: (prev, page, limit) => `${prev}?limit=${limit}&offset=${page * limit}`
    }
  },
  search: {
    server: {
      url: (prev, keyword) => `${prev}?search=${keyword}`
    }
  },
  server: {
    url: 'dashboard/getLearnersData',
    method: 'POST',
    then: (data) => data.learners.map((learner) => [learner.name, learner.email, learner.active]),
    total: (data) => data.count
  },
  className: {
    table: 'users-datatable-table',
    thead: 'users-datatable-thead',
    tbody: 'users-datatable-tbody',
    tr: 'users-datatable-tr',
    td: 'users-datatable-td'
  }
}).render(document.getElementById('datatable-users-table'))

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('edit-button-datatable-disabled')) {
    const email = e.target.getAttribute('data-email')
    temp_email = email
    showEditModal(email)
  }
})
