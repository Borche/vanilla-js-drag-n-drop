const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

containers.forEach(container => {
  container.addEventListener('dragover', event => {
    // Enable dropping - change that cursor.
    event.preventDefault();

    const elementBelow = getElementBelow(container, event.clientY);
    const draggable = document.querySelector('.dragging');

    if (!elementBelow) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, elementBelow);
    }
  });
});

function getElementBelow(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)')
  ];

  return draggableElements.reduce(
    (closestSoFar, current) => {
      const box = current.getBoundingClientRect();
      const offset = y - (box.top + box.height / 2);
      if (offset < 0 && offset > closestSoFar.offset) {
        return { offset: offset, element: current };
      } else {
        return closestSoFar;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
