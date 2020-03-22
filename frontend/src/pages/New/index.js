import React, { useState, useMemo } from 'react';
import api from './../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbinail] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = new FormData();
    const user_id = localStorage.getItem('user_id');

    payload.append('thumbnail', thumbnail);
    payload.append('company', company);
    payload.append('techs', techs);
    payload.append('price', price);

    await api.post('/spots', payload, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{backgroundImage: `url(${preview})`}}
        className={thumbnail ? 'has-thumbnail': ''}>
        <input type="file" onChange={event => setThumbinail(event.target.files[0])} />
        <img src={camera} alt="Camera" />
      </label>

      <label htmlFor="company">Empresa *</label>
      <input
        type="text"
        id="company"
        value={company}
        placeholder="Sua empresa incrível"
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
      <input
        type="text"
        id="techs"
        value={techs}
        placeholder="Quais tecnologias usam?"
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">Valor da diária *</label>
      <input
        type="text"
        id="price"
        value={price}
        placeholder="Valor cobrado por dia?"
        onChange={event => setPrice(event.target.value)}
      />

      <button className="btn"> Cadastrar </button>
    </form>
  )
}
