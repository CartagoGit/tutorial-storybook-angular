import { State, StateContext, Action, Selector } from '@ngxs/store';
import { Task } from '../models/task.model';

//* Define las acciones disponibles para la aplicacion
export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK',
  // Define el nuevo campo de error que necesitamos
  ERROR: 'APP_ERROR',
};

export class ArchiveTask {
  static readonly type = actions.ARCHIVE_TASK;

  constructor(public payload: string) {}
}

export class PinTask {
  static readonly type = actions.PIN_TASK;

  constructor(public payload: string) {}
}

// La definición de clase para nuestro campo de error.
export class AppError {
  static readonly type = actions.ERROR;
  constructor(public payload: boolean) {}
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
  entities: { [id: string]: Task };
  error: boolean;
}

// Establece el estado predeterminado
@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    entities: defaultTasks,
    error: false,
  },
})
export class TasksState {
  @Selector()
  static getAllTasks(state: TaskStateModel): Task[] {
    const entities = state.entities;
    return Object.keys(entities).map((id) => entities[+id]);
  }
  // Define un nuevo selector para el campo de error.
  @Selector()
  static getError(state: TaskStateModel) {
    const { error } = state;
    return error;
  }

  // Activa la accion PinTask, similar a redux
  @Action(PinTask)
  public pinTask(
    // { patchState, getState }: StateContext<TaskStateModel>,
    stateContext: StateContext<TaskStateModel>,
    { payload }: PinTask
  ): void {
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

  // Función para manejar cómo se debe actualizar el estado cuando se activa la acción
  @Action(AppError)
  setAppError(
    { patchState, getState }: StateContext<TaskStateModel>,
    { payload }: AppError
  ) {
    const state = getState();
    patchState({
      error: !state.error,
    });
  }

  /**
   * ? Refactorizacion de codigo de la accion de archivar y señalar la tarea
   * @param StateContext<TaskStateModel>{ patchState, getState} :
   * @param payload
   * @param newState
   */
  private _changeTaskState(
    { patchState, getState }: StateContext<TaskStateModel>,
    payload: string,
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
