exports.render = () => {
  return `<form>
      <div class="list">
        <label class="item item-input item-stacked-label">
          <span class="input-label">Tarefa</span>
          <input type="text" data-taks>
        </label>
      <div class="padding">
        <button class="button button-positive button-block">
          <i class="ion-compose"></i> Salvar
        </button>
      </div>
    </form>`;
};
