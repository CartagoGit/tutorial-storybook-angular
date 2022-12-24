import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { TaskComponent } from './task.component';

export default {
  component: TaskComponent,
  decorators: [
    moduleMetadata({
      declarations: [TaskComponent],
      imports: [CommonModule],
    }),
  ],
  excludeStories: /.*Data$/,
  title: 'Tutorial/Simple/Tarea',
} as Meta;

export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

const Template: Story<TaskComponent> = (args) => ({
  // component: TaskComponent,
  props: {
    ...args,
    onPinTask: actionsData.onPinTask,
    onArchiveTask: actionsData.onArchiveTask,
  },
});

export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: 'Test de Tarea',
    state: 'TASK_INBOX',
    updatedAt: new Date(2021, 0, 1, 9, 0)
  }
}

export const Pinned = Template.bind({});
Pinned.args = {
  task  : {
    ...Default.args.task!,
    state: 'TASK_PINNED'
  }
}

export const Archived = Template.bind({});
Archived.args = {
  task  : {
    ...Default.args.task!,
    state: 'TASK_ARCHIVED'
  }
}

export const AlgoNuevo = Template.bind({});
AlgoNuevo.args = {
  task  : {
    ...Default.args.task!,
    state: 'TASK_ALGO_NUEVO'
  }
}
