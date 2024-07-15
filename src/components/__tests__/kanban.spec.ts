import { describe,it,expect,beforeEach } from 'vitest'
import { useKanbanStore } from "@/stores/kanban";
import { Column } from '@/classes/Column';
import { Task } from '@/classes/Task';
import { Performer } from '@/classes/Performer';
import { createPinia, setActivePinia } from 'pinia';


describe('kanbanStore tests', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('Тест удаления таски у колонки (removeItemFromColumn)', async () => {
        const kanbanStore = useKanbanStore();
        kanbanStore.tasks.push(new Task(1, 'Тестовое название', 'Тестовое описание', new Performer(1,'aqwewq')));
        kanbanStore.columns.push(new Column(1, 'Тестовое название',[kanbanStore.tasks[0]]));
        expect(kanbanStore.columns[0].items.length).toBe(1);
        kanbanStore.removeItemFromColumn(1,1);
        expect(kanbanStore.columns[0].items.length).toBe(0);
    });

    it('Тест добавления таски (addItemToColumn)', async () => {
        const kanbanStore = useKanbanStore();
        kanbanStore.tasks.push(new Task(1, 'Тестовое название', 'Тестовое описание', new Performer(1,'aqwewq')));
        kanbanStore.columns.push(new Column(1, 'Тестовое название',[]));
        expect(kanbanStore.columns[0].items.length).toBe(0);
        kanbanStore.addItemToColumn(1,1);
        expect(kanbanStore.columns[0].items.length).toBe(1);
    });

    it('Тест перемещения таски (moveItem)', async () => {
        const kanbanStore = useKanbanStore();
        kanbanStore.tasks.push(new Task(1, 'Тестовое название', 'Тестовое описание', new Performer(1,'aqwewq')));
        kanbanStore.columns.push(new Column(1, 'Тестовое название',[kanbanStore.tasks[0]]));
        kanbanStore.columns.push(new Column(2, 'Тестовое название',[]));
        kanbanStore.moveItem(1,1,2);
        expect(kanbanStore.columns[0].items.length).toBe(0);
        expect(kanbanStore.columns[1].items.length).toBe(1);
        expect(kanbanStore.columns[1].items[0].id).toBe(1);
    })

    it('Тест создания новой колонки (addNewColumn)', async () => {
        const kanbanStore = useKanbanStore()
        kanbanStore.addNewColumn();
        expect(kanbanStore.columns.length).toBe(1);
        expect(kanbanStore.columns[0].id).toBe(1);
    })

    it('Тест удаления колонки (removeColumn)', async () => {
        const kanbanStore = useKanbanStore()
        kanbanStore.columns.push(new Column(1, 'Тестовое название',[]));
        expect(kanbanStore.columns.length).toBe(1);
        kanbanStore.removeColumn(1);
        expect(kanbanStore.columns.length).toBe(0);
    })

    it('Тест создания новой таски (addNewItem)', async () => {
        const kanbanStore = useKanbanStore();
        const column = new Column(1, 'Тестовое название',[]);
        kanbanStore.columns.push(column);
        kanbanStore.addNewItem(1);
        expect(kanbanStore.tasks.length).toBe(1);
        expect(kanbanStore.columns[0].items.length).toBe(1);
    })

    it('Тест удаления таски из списка тасок (removeTask)', async () => {
        const kanbanStore = useKanbanStore();
        const column = new Column(1, 'Тестовое название',[]);
        kanbanStore.columns.push(column);
        kanbanStore.tasks.push(new Task(1, 'Тестовое название', 'Тестовое описание', new Performer(1,'aqwewq')));
        kanbanStore.columns[0].items.push(kanbanStore.tasks[0]);
        expect(kanbanStore.tasks.length).toBe(1);
        expect(kanbanStore.columns[0].items.length).toBe(1);
        kanbanStore.removeTask(1,1);
        expect(kanbanStore.tasks.length).toBe(0);
        expect(kanbanStore.columns[0].items.length).toBe(0);
    })

    it('Тест геттера таски по id (getTask)', async () => {
        const kanbanStore = useKanbanStore();
        const task = new Task(1, 'Тестовое название', 'Тестовое описание', new Performer(1,'aqwewq'));
        kanbanStore.tasks.push(task);
        expect(kanbanStore.getTask(1).id).toBe(1);
    })

    it('Тест добавления исполнителя (addNewPerformer)', async () => {
        const kanbanStore = useKanbanStore();
        kanbanStore.addNewPerformer('Иван');
        expect(kanbanStore.performers.length).toBe(1);
        expect(kanbanStore.performers[0].name).toBe('Иван');
    })

    it('Тест удаления исполнителя (removePerformer)', async () => {
        const kanbanStore = useKanbanStore();
        kanbanStore.performers.push(new Performer(1,'Иван'));
        expect(kanbanStore.performers.length).toBe(1);
        kanbanStore.removePerformer(1);
        expect(kanbanStore.performers.length).toBe(0);
    })
});