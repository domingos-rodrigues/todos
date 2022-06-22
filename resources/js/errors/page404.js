import React from 'react';
import { Button } from '../Components/Button';
import { withRouter } from 'react-router-dom'

const page404 = withRouter(({ history }) => (

    <div
        status="404"
        title="404"
        style={{ borderRadius: 10 }}

>
        <div>Desculpe, a página que procura não existe.</div>

<Button type="primary" onClick={() => { history.replace('/') }}>Voltar</Button>
    </div>


))

export default page404
