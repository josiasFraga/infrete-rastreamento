import {call, put, takeLatest} from 'redux-saga/effects';
import {callApi} from '../../services/api';
import { toast } from 'react-toastify';

function* cadastro({payload}) {

    var data = new FormData();
    var dados = payload.submitValues;

    console.log(JSON.stringify(dados));

    data.append("dados", JSON.stringify(dados));

    let endpoint = process.env.REACT_APP_API_URL + '/usuarios/add.json';

    if ( dados.id && dados.id !== null && dados.id !== '' ) {
        endpoint = process.env.REACT_APP_API_URL + '/usuarios/edit/' + dados.id + '.json';
    }

    try {
        const response = yield call(callApi, {
            endpoint: endpoint,
            method: 'POST',
            data: data,
        });

        payload.setSubmitting(false);

        if ( response.data.status !== 'ok' ) {
            toast.error("Ocorreu um erro ao realizar o cadastro, tente novamente." );
        } else {
            toast.success("O cadastro foi realizado com sucesso!");
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

function* bClienteFrotas({payload}) {

    try {
        const response = yield call(callApi, {
            endpoint: process.env.REACT_APP_API_URL + '/frotas/client/' + payload.client_id + '.json',
            method: 'GET',
            params: {},
        });

        if (response.status === 200) {
            yield put({
				type: 'BUSCA_CLIENTE_FROTAS_SUCCESS',
				payload: response.data.data
			});
        } else {
            toast.error("Ocorreu um erro ao buscar as frotas");
            yield put({
				type: 'BUSCA_CLIENTE_FROTAS_FAILED'
			});
        }

    } catch ({message, response}) {
        toast.error("Ocorreu um erro ao buscar as frotas");yield put({
            type: 'BUSCA_CLIENTE_FROTAS_FAILED',
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

function* sFrota({payload}) {

    var data = new FormData();
    var dados = payload.submitValues;

    console.log(JSON.stringify(dados));

    data.append("dados", JSON.stringify(dados));

    let endpoint = process.env.REACT_APP_API_URL + '/frotas/add.json';

    if ( dados.id && dados.id !== null && dados.id !== '' ) {
        endpoint = process.env.REACT_APP_API_URL + '/frotas/edit/' + dados.id + '.json';
    }

    try {
        const response = yield call(callApi, {
            endpoint: endpoint,
            method: 'POST',
            data: data,
        });

        payload.setSubmitting(false);

        if ( response.data.status !== 'ok' ) {
            toast.error("Ocorreu um erro ao realizar o cadastro, tente novamente." );
        } else {
            toast.success("O cadastro foi realizado com sucesso!");
            if ( payload.callback ) {
                payload.callback();
            }
        }


    } catch ({message, response}) {
        toast.error("Ocorreu um erro ao realizar o cadastro, tente novamente. " + message );
        console.warn('[ERROR : CADASTRO FROTA]', {message, response});
        payload.setSubmitting(false);
    }

}

function* dFrota({payload}) {

    try {
        const response = yield call(callApi, {
            endpoint: process.env.REACT_APP_API_URL + '/frotas/delete/' + payload.id + '.json',
            method: 'DELETE',
        });

        if (response.status === 200) {
            payload.callback();
            yield toast.success("Frota excluída com sucesso!");
        }
        yield put({
            type: 'DELETE_FROTA_SUCCESS',
            payload: {}
        });

    } catch ({message, response}) {
        yield toast.error("Erro ao excluir a frota");
        yield put({
            type: 'DELETE_FROTA_SUCCESS',
            payload: {}
        });
    }

}

function* sConfigs({payload}) {

    var data = new FormData();
    var dados = payload.submitValues;

    console.log(JSON.stringify(dados));

    data.append("dados", JSON.stringify(dados));

    const endpoint = process.env.REACT_APP_API_URL + '/configs/edit/' + dados.key + '.json';

    try {
        const response = yield call(callApi, {
            endpoint: endpoint,
            method: 'POST',
            data: data,
        });

        payload.setSubmitting(false);

        if ( response.data.status !== 'ok' ) {
            toast.error("Ocorreu um erro ao salvar as configurações, tente novamente." );
        } else {
            toast.success("As configurações foram atualizadas com sucesso!");
            if ( payload.callback ) {
                payload.callback();
            }
        }


    } catch ({message, response}) {
        toast.error("Ocorreu um erro ao atualizar as configurações, tente novamente. " + message );
        console.warn('[ERROR : SAVE CONFIGS]', {message, response});
        payload.setSubmitting(false);
    }

}

function* bConfigs({payload}) {

    try {
        const response = yield call(callApi, {
            endpoint: process.env.REACT_APP_API_URL + '/configs/view.json',
            method: 'GET',
            params: {
                key: payload.key
            },
        });

        if (response.data.status === 'ok') {
            if ( payload.key == 'support_phone' ) {
                yield put({
                    type: 'SET_SUPPORT_PHONE',
                    payload: response.data.data
                });

            }
        } else {
            toast.error("Ocorreu um erro ao buscar as configurações");
            yield put({
				type: 'BUSCA_CONFIGS_FAILED'
			});
        }

    } catch ({message, response}) {
        toast.error("Ocorreu um erro ao buscar as configurações");
        yield put({
            type: 'BUSCA_CONFIGS_FAILED',
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
	yield takeLatest('BUSCA_CLIENTE_FROTAS', bClienteFrotas);
	yield takeLatest('SALVA_FROTA', sFrota);
	yield takeLatest('DELETE_FROTA', dFrota);
	yield takeLatest('SAVE_CONFIGS', sConfigs);
	yield takeLatest('BUSCA_CONFIGS', bConfigs);
    
    
}