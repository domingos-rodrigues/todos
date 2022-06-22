import React, {Component} from "react";

export default class Modal extends Component{

    constructor(props) {
        super(props);
        // console.log('props = ', this.props);
    }

    render() {
        const t = this.props.todo.todoId;
        // console.log('t_Id   - ',t);
        // console.log('showModal =  ' , this.props.todo.showModal);
        return (
            <>
                {this.props.todo.showModal ? (
                    <div
                        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                        id="exampleModalSm" tabIndex="-1" aria-labelledby="exampleModalSmLabel" aria-modal="true"
                        role="dialog">
                        <div className="modal-dialog modal-sm relative w-auto pointer-events-none">
                            <div
                                className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                <div
                                    className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                    <h5 className="text-xl font-medium leading-normal text-gray-800"
                                        id="exampleModalSmLabel">
                                        Delete this todo:<br/> {this.props.todo.todoAction.todo_name}
                                    </h5>
                                </div>
                                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button"
                                        className="px-6 py-2.5
                                            bg-grey-100
                                            text-gray-400 font-medium text-xs
                                            leading-tight uppercase rounded shadow-md
                                            hover:bg-gray-700 hover:shadow-lg
                                            focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
                                            active:bg-gray-800 active:shadow-lg
                                            transition duration-150 ease-in-out"
                                        data-bs-dismiss="modal"
                                        onClick={() => this.props.onCancel(this.props.todo.todoId)}
                                    >
                                        Close
                                    </button>
                                    <button type="button"
                                        className="px-6 py-2.5
                                              bg-blue-600
                                              text-white font-medium text-xs
                                              leading-tight uppercase rounded shadow-md
                                              hover:bg-blue-700 hover:shadow-lg
                                              focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                                              active:bg-blue-800 active:shadow-lg
                                              transition duration-150 ease-in-out
                                              ml-1"
                                            data-bs-dismiss='modal'
                                        onClick={() => this.props.onDelete(this.props.todo.todoId)}
                                    >
                                        Confirm delete
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>
                ) : null }
            </>
        )
    }
}
