import React, {useState, useContext} from 'react';

export default class ProjectSelect extends React.Component
{
    constructor(props) {
        super(props);
        // console.log('props',this.props.userdetail.projectSel1);
    }

     renderSelect() {
        //  console.log(projects);
        if(!this.props.projects){
            return (<></>)
        }
        return (
            <select className='form-select mt-4 border-0 hover:border-0 text-blue-500'
                    value={this.props.userdetail.projectSel1}
                    id={`projectSel01`}
                    onChange={this.props.onChange}
            >
                <option >todos</option>
                    {Object.values(this.props.projects).map(
                        project => <option key={project.id} value={project.id}>
                            {project.project_name} ({project.id})
                        </option>)}
            </select>
        )
    }

    render() {
        return (
            <div>
                {this.renderSelect()}
            </div>
        );
    }
}
