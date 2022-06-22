import React, {useState, useContext, Component, useCallback} from 'react';
import Modal from '../../../Components/Modal';
import {ImBin} from "react-icons/im";

export default class TodosFromSelect extends Component
{
    state = {
        projects: {},
        todos: {},
        done: {},
        showModal1: false,
        todoId: 0,
    }


    constructor(props) {
        super(props);
        // console.log('props',this.props);

        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.endTask = this.endTask.bind(this);
        this.getDataProject = this.getDataProject.bind(this);
    }

    componentDidMount = async () => {
        await this.getDataProject();
    }

    componentDidUpdate = async (previousProps, previousState) => {
            if (previousProps.project !== this.props.project) {
                // console.log('update props = ', this.props);
                await this.getDataProject();
            }
    }

    getDataProject = async () => {
        try {
            const resp = await this.props.http.get(`api/todos/${this.props.project}`);

            // colocar a chave = id
            const todosResp = resp.data.todos.reduce((obj, v, i) => {
                    return {...obj, [v.id]: v};
                }, {}
            );
            const todo = {};
            const done = {};
            // separar por dois objectos distintos
            Object.entries(todosResp).forEach(([key, value]) => {
                    value.conclusion_at ? done[key] = value : todo[key] = value;
                }
            );
            this.setState({todos: {[this.props.project]: todo}});
            this.setState({done: {[this.props.project]: done}});

        } catch(e) {
            console.log('erro do axios .= ',e);
        }
    }

    handleClick = (task) => {
        // e.preventDefault();
        // this.modal1();
        console.log(task);
        // this.setState({showModal1:true})
        // console.log("showModal1 = ", this.state.showModal1);
        // this.selModal(task);
        // console.log(task);
    }


    endTask = async (task) => {
        const project = this.props.project;
        const taskDone = this.state.todos[project][task];
        taskDone.conclusion_at = new Date().toJSON();

        try {
            const resp = await this.props.http.post(`api/todo/endTask/${task}`);
            if (resp.status === 200){
                const newDone = this.state.done[project];
                newDone[task] = taskDone;
                this.setState(prevState => ({ done: {[project]: {...newDone}} }));
                const newTodos = this.state.todos[project];
                delete newTodos[task];
                this.setState(prevState => ({ todos: {[project]: {...newTodos}} }));
            }
        }
        catch(e) {
            console.log(e);
        }
        // console.log(task, ' ...state... ', this.state);
    }

    newTask = async (newT) => {
        const project = this.props.project;
        const createTask = document.getElementById(`editTask${this.props.editProj}`).value;
        if(!createTask){
            return;
        }
        const data = {project_id: project, todo_name: createTask};
        // console.log('project_id - newTask - ', data);
        try {
            const resp = await this.props.http.post(`api/todo/newTask`, data);
            // console.log('resp ', resp.data );
            if (resp.status === 200){
                const newTodos = this.state.todos[project];
                newTodos[resp.data.project_id] = resp.data;

                this.setState(prevState => ({ todos: {[project]: {...newTodos}} }));
                document.getElementById(`editTask${this.props.editProj}`).value = "";
            }
        }
        catch(e) {
            console.log(e);
        }
        // console.log(newT, ' ...state... ', this.state.todos);
    }

    editTask = () => {}

    handleDelete = async (task) => {

        const project = this.props.project;
        // console.log(' .... task = ', task)
        // console.log(' .... project = ', project)

        // const taskDone = this.state.todos[project][task];
        try {
            const resp = await this.props.http.post(`api/todo/delete/${task}`);

            if (resp.status === 200){
                const newTodos = this.state.todos[project];
                delete newTodos[task];
                this.setState(prevState => ({ todos: {[project]: {...newTodos}} }));
                console.log(' .... state = ', this.state)
            }
        }
        catch(e) {
            console.log(e);
        }
        this.handleCloseModal();
    }

    handleShowModal = () => {

        this.setState( {showModal1: !this.state.showModal1});
    };
    // , [this.state.showModal1]);

    handleCloseModal = () => {
        // console.log("estou bnjhjjhj ");
        this.setState({showModal1: false});
    };

    renderSelect() {
        const todosProj = this.state.todos[this.props.project];
        if(
            !todosProj
            || Object.keys(todosProj).length === 0
            || todosProj.constructor !== Object
        ){
            return (<></>)
        }
        // const todosProjVal = Object.entries(todosProj);
        // console.log(`aaaaaa ${this.state.todoId} .   ${todosProj}[${this.state.todoId}]`, todosProj[this.state.todoId]);
        return (
            <div>
                {this.state.showModal1 &&
                    <Modal
                        onCancel={this.handleCloseModal}
                        onDelete={() => this.handleDelete(task)}
                        todo={{showModal:this.state.showModal1, todoId: this.state.todoId, todoAction: todosProj[this.state.todoId], todoBack:0}}/>}
            <div className={`flex-1 h-40 min-h-36 max-h-40 overflow-y-auto`}>
                <div>
                    <ul>
                    {Object.values(todosProj).map( todo => {
                        // console.log('todo ', todo.id);
                        if(todo) {
                             return <li className={`flex`} key={todo.id} value={todo.id}>
                                <div className={`flex-auto ml-1 `}>
                                    <input
                                        type='checkbox'
                                        className={`border-1 border-gray-500`}
                                        data-bs-toggle='tooltip'
                                        title={`conclude now this task`}
                                        onChange={() => this.endTask(todo.id)}
                                    />
                                    <label className={`mx-2 sm:text-sm`}>
                                        {todo.todo_name}
                                    </label>
                                </div>
                                <div className={`justify-end`}>
                                    <button
                                        type='button'
                                        data-bs-toggle='modal'
                                        data-bs-target='#exampleModalSm'
                                        className="py-2 px-2 text-red-600"
                                        onClick={() => {
                                            this.setState({todoId: todo.id});

                                            this.handleShowModal();
                                            // console.log('id ... ', this.state.todoId);
                                        }}
                                    >
                                        <ImBin/>
                                    </button>

                                </div>
                            </li>}
                    })}
                    </ul>
                </div>
            </div>
            </div>
        )
    }

    renderDone(){
        const todosProj = this.state.done[this.props.project];
        if(
            !todosProj
            || Object.keys(todosProj).length === 0
            || todosProj.constructor !== Object
        ){
            return (<></>)
        }
        return (
            <div className={`h-28 min-h-20 max-h-32 overflow-y-auto`}>
                <div>
                    <ul>
                        {Object.values(todosProj).map(todo => {
                            // console.log('todo   ',todo);
                            if(todo) { return <li className={`flex mx-2`} key={todo.id} value={todo.id}>
                                <div className={`flex-auto ml-4`}>
                                    <p>
                                        <a href="#"
                                           className="sm:text-sm text-gray-700 hover:text-blue-700 transition duration-150 ease-in-out"
                                           data-bs-toggle='tooltip' title={`Started in: ${todo.created_at.split("T")[0]}\nEnded in:   ${todo.conclusion_at.split(" ")[0]}`} >{todo.todo_name}</a>
                                    </p>
                                </div>
                            </li>}
                        })}
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={`flex flex-col justify-items-stretch h-auto`} >
                <div className={`mt-6 flex-auto`}>
                    <div className={`my-2 text-xl font-bold border-b-2`}>
                        Todo
                    </div>
                    <div className={`flex flex-col text-xs font-normal`}>
                        {this.renderSelect()}
                    </div>
                </div>
                <div className={`mt-6 flex-auto`}>
                    <div className={`my-2 text-xl font-bold border-b-2`}>
                        Done
                    </div>
                    <div className={`flex flex-col text-xs font-normal `}>
                        {this.renderDone()}
                    </div>
                </div>
                <div className={`flex mt-4 text-xl font-normal`}>
                    <div className={`flex-auto`}></div>
                    <div className={`justify-end text-xs`}>
                        <input
                            type="text"
                            name={`editTask${this.props.editProj}`}
                            id={`editTask${this.props.editProj}`}
                            placeholder={`Task`}
                            className="mt-4
                            focus:ring-indigo-500 focus:border-indigo-500 shadow-sm
                            sm:text-sm border-none border-b-3 border-gray-500 rounded-md"
                        />
                        <button className="mx-2 px-6 py-2 sm:text-sm font-bold text-white bg-blue-500 rounded"
                                type={`button`}
                                onClick={() => { this.newTask(this.props.editProj)}}
                        >
                            ADD
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
