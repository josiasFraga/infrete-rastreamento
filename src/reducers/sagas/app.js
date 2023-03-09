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
        console.warn('[ERROR : LOGIN]', {message, response});
        payload.setSubmitting(false);
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
            localStorage.setItem("bearerToken", response.data.token) 
            toast.success("Logado com sucesso!");
            if ( payload.callback ) {
                payload.callback();
            }
        } else {
            toast.error("Login e/ou senha inválido(s)");
        }

    } catch ({message, response}) {
        toast.error("Login e/ou senha inválido(s)");
        payload.setSubmitting(false);
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

export default function* () {
	yield takeLatest('LOGIN_TRIGGER', login);
	yield takeLatest('CADASTRO_TRIGGER', cadastro);
	yield takeLatest('BUSCA_MINHAS_FROTAS', bMinhasFrotas);
	yield takeLatest('SET_FROTA_SELECIONADA_TRIGGER', sFrotaSelecionada);
	yield takeLatest('BUSCA_TRACES_FROTA', bTracesFrota);
	yield takeLatest('BUSCA_CLIENTES', bClientes);
}