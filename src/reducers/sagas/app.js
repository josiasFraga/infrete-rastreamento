import {call, put, takeLatest} from 'redux-saga/effects';
import {callApi} from '../../services/api';
import { toast } from 'react-toastify';

function* cadastro({payload}) {

    var data = new FormData();
    var dados = payload.submitValues;

    data.append("dados", JSON.stringify(dados));

    try {
        const response = yield call(callApi, {
            endpoint: process.env.REACT_APP_API_URL + '/usuarios/add.json',
            method: 'POST',
            data: data,
        });

        payload.setSubmitting(false);

        if ( response.status !== 'ok' ) {
            toast.error("Ocorreu um erro ao realizar o cadastro, tente novamente." );
        } else {
            toast.success("Seu cadastro foi realizado com sucesso!");
            if ( payload.callback ) {
                payload.callback();
            }
        }


    } catch ({message, response}) {
        toast.error("Ocorreu um erro ao realizar o cadastro, tente novamente. " + message );
        console.warn('[ERROR : CADASTRO]', {message, response});
        payload.setSubmitting(false);
    }

}

function* eu() {

    try {
        const response = yield call(callApi, {
            endpoint: process.env.REACT_APP_API_URL + '/usuarios/eu.json',
            method: 'GET',
        });

        if (response.status === 200) {
            yield localStorage.setItem("userInfo", JSON.stringify(response.data.data)) 

        } 

    } catch ({message, response}) {
        yield toast.error("Erro ao buscar as informações do usuário");
    }

}

function* login({payload}) {

    var data = new FormData();
    var dados = payload.submitValues;

    data.append("dados", JSON.stringify(dados));

    try {
        const response = yield call(callApi, {
            endpoint: process.env.REACT_APP_API_URL + '/auth/login/',
            method: 'POST',
            data: data,
        });

        payload.setSubmitting(false);

        console.log(response);

        if (response.status === 200) {
            yield localStorage.setItem("bearerToken", response.data.token);
            yield eu();
            yield toast.success("Logado com sucesso!");
            if ( payload.callback ) {
                payload.callback();
            }
        } else {
            yield toast.error("Login e/ou senha inválido(s)");
        }

    } catch ({message, response}) {
        yield toast.error("Login e/ou senha inválido(s)");
        yield payload.setSubmitting(false);
    }

}

function* bMinhasFrotas({payload}) {

    try {
        const response = yield call(callApi, {
            endpoint: process.env.REACT_APP_API_URL + '/frotas/index.json',
            method: 'GET',
            params: {},
        });

        if (response.status === 200) {
            yield put({
				type: 'BUSCA_MINHAS_FROTAS_SUCCESS',
				payload: response.data.data
			});
        } else {
            toast.error("Ocorreu um erro ao buscar suas frotas");
            yield put({
				type: 'BUSCA_MINHAS_FROTAS_FAILED'
			});
        }

    } catch ({message, response}) {
        toast.error("Ocorreu um erro ao buscar suas frotas");yield put({
            type: 'BUSCA_MINHAS_FROTAS_FAILED',
        });
    }

}

function* sFrotaSelecionada({payload}) {
        
    yield put({
	    type: 'SET_FROTA_SELECIONADA',
		payload: payload.frota
    });

}

function* bTracesFrota({payload}) {

    try {
        const response = yield call(callApi, {
            endpoint: process.env.REACT_APP_API_URL + '/traces/index.json',
            method: 'GET',
            params: payload,
        });

        if (response.status === 200) {
            yield put({
				type: 'BUSCA_TRACES_FROTA_SUCCESS',
				payload: response.data.data
			});
        } else {
            toast.error("Ocorreu um erro ao buscar os traces da frota");
            yield put({
				type: 'BUSCA_TRACES_FROTA_FAILED'
			});
        }

    } catch ({message, response}) {
        toast.error("Ocorreu um erro ao buscar os traces da frota");yield put({
            type: 'BUSCA_TRACES_FROTA_FAILED',
        });
    }

}

function* bClientes({payload}) {

    try {
        const response = yield call(callApi, {
            endpoint: process.env.REACT_APP_API_URL + '/usuarios/index.json',
            method: 'GET',
            params: payload,
        });

        if (response.status === 200) {
            yield put({
				type: 'BUSCA_CLIENTES_SUCCESS',
				payload: response.data.data
			});
        } else {
            toast.error("Ocorreu um erro ao buscar os clientes");
            yield put({
				type: 'BUSCA_CLIENTES_FAILED'
			});
        }

    } catch ({message, response}) {
        toast.error("Ocorreu um erro ao buscar os clientes");yield put({
            type: 'BUSCA_CLIENTES_FAILED',
        });
    }

}

function* dUsuario({payload}) {

    try {
        const response = yield call(callApi, {
            endpoint: process.env.REACT_APP_API_URL + '/usuarios/delete/' + payload.id + '.json',
            method: 'DELETE',
        });

        if (response.status === 200) {
            yield bClientes({payload: {}});
            yield toast.success("Usuário excluído com sucesso!");
        }
        yield put({
            type: 'DELETE_USUARIO_SUCCESS',
            payload: {}
        });

    } catch ({message, response}) {
        yield toast.error("Erro ao excluir o usuário");
        yield put({
            type: 'DELETE_USUARIO_SUCCESS',
            payload: {}
        });
    }

}

export default function* () {
	yield takeLatest('LOGIN_TRIGGER', login);
	yield takeLatest('CADASTRO_TRIGGER', cadastro);
	yield takeLatest('BUSCA_MINHAS_FROTAS', bMinhasFrotas);
	yield takeLatest('SET_FROTA_SELECIONADA_TRIGGER', sFrotaSelecionada);
	yield takeLatest('BUSCA_TRACES_FROTA', bTracesFrota);
	yield takeLatest('BUSCA_CLIENTES', bClientes);
	yield takeLatest('DELETE_USUARIO', dUsuario);
}