import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { CommonModule } from '@angular/common';

import { TaskListComponent } from './task-list.component';
import { TaskComponent } from '../task/task.component';
import * as TaskStories from '../task/task.stories';

export default {
  component: TaskListComponent,
  decorators: [
    moduleMetadata({
      //👇 Importa ambos componentes para permitir la composición de componentes con Storybook
      declarations: [TaskListComponent, TaskComponent],
      imports: [CommonModule],
    }),
    //👇 Envuelve nuestras historias con un decorador
    componentWrapperDecorator(
      (story) => `<div style="margin: 3em">${story}</div>`
    ),
  ],
  title: 'Tutorial/Compuesto/Lista de Tareas',
} as Meta;

const Template: Story<TaskListComponent> = (args) => ({
  props: {
    ...args,
    onPinTask: TaskStories.actionsData.onPinTask,
    onArchivedTask: TaskStories.actionsData.onArchiveTask,
  },
});

/**
 * ? Funcion para devolver el state de la tarea al azar
 */
const getState = (num: number): string => {
  const states = ['INBOX', 'ARCHIVED', 'NEW', 'PINNED'];
  return 'TASK_' + states[num];
};

export const Default = Template.bind({});
Default.args = {
  tasks: Array(10)
    .fill(null)
    .map((_elem, index) => ({
      ...TaskStories.Default.args?.task!,
      id: index.toString(),
      title: 'Tarea ' + index,
      updatedAt: new Date(Date.now()),
    })),
};

export const RandomTasks = Template.bind({});
RandomTasks.args = {
  tasks: Array(Math.ceil(Math.random() * 7) + 3)
    .fill(null)
    .map((_elem, index) => {
      const rand = Math.floor(Math.random() * 4);
      console.log(rand);
      return {
        ...TaskStories.Default.args?.task!,
        id: index.toString(),
        title: 'Tarea ' + index,
        updatedAt: new Date(Date.now()),
        state: getState(rand),
      };
    }),
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Dar forma a las historias a través de la composición de argumentos.
  // Datos heredados que provienen de la historia predeterminada.
  tasks: [
    ...Default.args.tasks!.slice(0, 5),
    {
      id: '6',
      title: 'Task 6 (pinned)',
      state: 'TASK_PINNED',
      updatedAt: new Date(Date.now()),
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Dar forma a las historias a través de la composición de argumentos.
  // Datos heredados que provienen de la historia de carga.
  ...Loading.args,
  loading: false,
};
