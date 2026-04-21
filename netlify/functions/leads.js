const { getStore } = require('@netlify/blobs');

const ACCENTURE_SEED = [
  {
    id: 1,
    name: 'Accenture',
    sector: 'Consulting',
    city: 'Milano',
    employees: 20000,
    hsrServed: true,
    growth: ['Hiring'],
    travelMgr: true,
    hsr_offices: '9/12 sedi vicine ad AV: Milano, Roma, Torino, Firenze, Bologna, Napoli, Verona, Padova, Modena/Reggio Emilia \u2713 \u2014 Cagliari, Cosenza, Misterbianco \u2717',
    analysis_summary: '\u2022 SETTORE: Accenture \u00e8 la principale societ\u00e0 di consulenza e servizi IT globale, operante in Italia con forte presenza nelle aziende enterprise.\n\u2022 DIMENSIONE: ~20.000 dipendenti in Italia (750.000 globali), con sedi nelle principali citt\u00e0.\n\u2022 VICINANZA AV: 9 sedi su 12 vicine a stazioni AV (Milano Centrale, Roma Termini, Torino Porta Nuova, Firenze SMN, Bologna Centrale, Napoli Centrale, Verona Porta Nuova, Padova, Reggio Emilia Mediopadana). Cagliari, Cosenza e Misterbianco non servite da AV.\n\u2022 CRESCITA: Assunzioni attive in Italia (Stage, Software Engineer, AI specialist). Investimenti strategici in AI, digitale e cloud. Alcuni tagli globali nel 2023 ma crescita nei settori chiave.\n\u2022 TRAVEL MANAGER: Global travel and events senior director con responsabili per area geografica. Politiche di viaggio strutturate con carte aziendali e rimborsi. Expertise interna nel settore Travel, Airline & Hospitality.',
    data_sources: 'Sito ufficiale Accenture.com, LinkedIn Jobs Italia, Il Sole 24 Ore, Bloomberg'
  }
];

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }

  const STORE_KEY = 'pipeline_v1';
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_TOKEN;

  if (!siteID || !token) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: 'Missing NETLIFY_SITE_ID or NETLIFY_TOKEN env vars' }) };
  }

  const store = getStore({ name: 'leads', siteID, token });

  // GET: return all leads
  if (event.httpMethod === 'GET') {
    try {
      const data = await store.get(STORE_KEY, { type: 'json' });
      const leads = data && Array.isArray(data) ? data : ACCENTURE_SEED;
      return { statusCode: 200, headers: CORS, body: JSON.stringify(leads) };
    } catch (err) {
      console.error("Errore lettura Blobs:", err);
      return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
    }
  }

  // POST: save new lead
  if (event.httpMethod === 'POST') {
    try {
      const newLeadRaw = JSON.parse(event.body);

      let current;
      try {
        current = await store.get(STORE_KEY, { type: 'json' });
        if (!current || !Array.isArray(current)) current = ACCENTURE_SEED;
      } catch {
        current = ACCENTURE_SEED;
      }

      const newLead = { ...newLeadRaw, id: Date.now() };
      const exists = current.find(l => l.name.toLowerCase() === newLeadRaw.name.toLowerCase());
      const updated = exists
        ? current.map(l => l.name.toLowerCase() === newLeadRaw.name.toLowerCase() ? newLead : l)
        : [newLead, ...current];
      await store.setJSON(STORE_KEY, updated);

      return { statusCode: 200, headers: CORS, body: JSON.stringify(updated) };
    } catch (err) {
      console.error("Errore salvataggio:", err);
      return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
    }
  }

  // DELETE: remove a lead by id
  if (event.httpMethod === 'DELETE') {
    try {
      const id = event.queryStringParameters?.id;
      if (!id) return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Missing id' }) };
      let current;
      try {
        current = await store.get(STORE_KEY, { type: 'json' });
        if (!current || !Array.isArray(current)) current = ACCENTURE_SEED;
      } catch { current = ACCENTURE_SEED; }
      const updated = current.filter(l => String(l.id) !== String(id));
      await store.setJSON(STORE_KEY, updated);
      return { statusCode: 200, headers: CORS, body: JSON.stringify(updated) };
    } catch (err) {
      return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 405, headers: CORS, body: 'Method Not Allowed' };
};

