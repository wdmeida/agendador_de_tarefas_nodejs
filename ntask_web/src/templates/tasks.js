const renderTasks = tasks => {
  return tasks.map(task => {
    let done = task.done ? "ios-chekmark" : "ios-circle-outline";

    return `<li class="item item-icon-left item-button-right">
        <i class="icon ion-${done}" data-done
          data-task-done="${task.done ? 'done' : ''}"
          data-task-id="${task.id}"></i>
          ${task.title}
          <button data-remove data-dask-id="${task.id}" class="button button-assertive"
            <i class="ion-trash-a"></i>
          </button>
        </li>`;
    }).join("");
};

exports.render = tasks => {
  if (tasks && tasks.length) {
    return `<ul class="list">${renderTasks(tasks)}</ul>`;
  } else {
    return `<h4 class="text-center">Nenhuma tarefa ainda</h4>`;
  }
};
