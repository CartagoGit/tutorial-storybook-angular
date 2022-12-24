import { State, StateContext, Action, Selector } from '@ngxs/store';
import { Task } from '../models/task.model';

//* Define las acciones disponibles para la aplicacion
export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK',
};

export class ArchiveTask {
  static readonly type = actions.ARCHIVE_TASK;

  constructor(public payload: number) {}
}

export class PinTask {
  static readonly type = actions.PIN_TASK;

  constructor(public payload: number) {}
}

// El estado inicial de nuestro store cuando se carga la aplicacion
// Por lo general, se obtendria esto de un servidor
const defaultTasks = {
  1: {
    id: '1',
    title: 'Algo',
    state: 'TASK_INBOX',
    updatedAt: new Date(Date.now()),
  },
  2: {
    id: '2',
    title: 'Algo mas',
    state: 'TASK_INBOX',
    updatedAt: new Date(Date.now()),
  },
  3: {
    id: '3',
    title: 'Algo tambien',
    state: 'TASK_INBOX',
    updatedAt: new Date(Date.now()),
  },
  4: {
    id: '4',
    title: 'Algo otra veee',
    state: 'TASK_INBOX',
    updatedAt: new Date(Date.now()),
  },
};

export class TaskStateModel {
  entities: { [id: number]: Task };
}

// Establece el estado predeterminado
@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    entities: defaultTasks,
  },
})
export class TaskState {
  @Selector()
  static getAllTasks(state: TaskStateModel) {
    const entities = state.entities;
    return Object.keys(entities).map((id) => entities[+id]);
  }

  // Activa la accion PinTask, similar a redux
  @Action(PinTask)
  public pinTask(
    // { patchState, getState }: StateContext<TaskStateModel>,
    stateContext: StateContext<TaskStateModel>,
    { payload }: PinTask
  ): void {
    // const state = getState().entities;
    // const entities = {
    //   ...state,
    //   [payload]: { ...state[payload], state: 'TASK_PINNED' },
    // };

    // patchState({ entities });
    this._changeTaskState(stateContext, payload, 'TASK_PINNED');
  }

  // Activa la accion de arvhiceTask similar a redux
  @Action(ArchiveTask)
  public archiveTask(
    stateContext: StateContext<TaskStateModel>,
    { payload }: ArchiveTask
  ): void {
    this._changeTaskState(stateContext, payload, 'TASK_ARCHIVED');
  }

  /**
   * ? Refactorizacion de codigo de la accion de archivar y señalar la tarea
   * @param StateContext<TaskStateModel>{ patchState, getState} :
   * @param payload
   * @param newState
   */
  private _changeTaskState(
    { patchState, getState }: StateContext<TaskStateModel>,
    payload: number,
    newState: string
  ): void {
    const state = getState().entities;
    const entities = {
      ...state,
      [payload]: { ...state[payload], state: newState },
    };

    patchState({ entities });
  }
}
