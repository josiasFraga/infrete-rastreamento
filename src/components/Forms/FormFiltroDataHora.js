import React from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import 'dayjs/locale/pt-br'; // Importar a localização para português do Brasil

dayjs.locale('pt-br'); // Definir a localização padrão como português do Brasil

const FormFiltroDataHora = (props) => {
  const formik = props.formik;
  const date_and_time_to_filter_traces = useSelector(state => state.appReducer.date_and_time_to_filter_traces);

  const handleDateTimeChange = (value) => {
    console.log(value.format('YYYY-MM-DDTHH:mm:ss'));
    formik.setFieldValue('date', value.format('YYYY-MM-DDTHH:mm:ss'));
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['StaticDateTimePicker']}>
          <DemoItem label="">
            <StaticDateTimePicker
                ampm={false} 
                disableFuture={true}
                defaultValue={dayjs(new Date(date_and_time_to_filter_traces))}
                onChange={handleDateTimeChange}
                label="SELECIONE A DATA E HORA"
                //onAccept={handleDateTimeChange}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default FormFiltroDataHora;