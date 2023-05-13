const contentBoxesType = document.querySelectorAll('.content-box-type')

// Loop through the content boxes and add a click event listener to each one
contentBoxesType.forEach((contentBox) => {
  contentBox.addEventListener('click', () => {
    // Remove the "selected" class from all content boxes
    contentBoxesType.forEach((box) => {
      box.classList.remove('selected')
    })

    // Add the "selected" class to the clicked content box
    contentBox.classList.add('selected')
  })
})
const contentBoxesLength = document.querySelectorAll('.content-box-length')

// Loop through the content boxes and add a click event listener to each one
contentBoxesLength.forEach((contentBox) => {
  contentBox.addEventListener('click', () => {
    // Remove the "selected" class from all content boxes
    contentBoxesLength.forEach((box) => {
      box.classList.remove('selected')
    })

    // Add the "selected" class to the clicked content box
    contentBox.classList.add('selected')
  })
})
const contentBoxesAssesments = document.querySelectorAll('.content-box-assesments')

// Loop through the content boxes and add a click event listener to each one
contentBoxesAssesments.forEach((contentBox) => {
  contentBox.addEventListener('click', () => {
    // Remove the "selected" class from all content boxes
    contentBoxesAssesments.forEach((box) => {
      box.classList.remove('selected')
    })

    // Add the "selected" class to the clicked content box
    contentBox.classList.add('selected')
  })
})
function hide() {
  document.getElementById('info-r').style.display = 'none'
}
function unhide() {
  document.getElementById('info-r').style.display = ''
}
