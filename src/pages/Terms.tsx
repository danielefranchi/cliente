import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString('it-IT');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Termini e Condizioni d'Uso</h1>
        
        <div className="prose prose-gray max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Introduzione</h2>
          <p>Benvenuto nel nostro sito dedicato alla condivisione di recensioni sui clienti. Utilizzando questa piattaforma, l'utente accetta i seguenti Termini e Condizioni d'Uso. Se non si accettano questi termini, si prega di non utilizzare il sito.</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">2. Scopo della piattaforma</h2>
          <p>Il sito fornisce uno spazio per recensire clienti basandosi su esperienze personali degli utenti. Non ci assumiamo alcuna responsabilità per l'accuratezza, la completezza o la veridicità delle recensioni pubblicate dagli utenti.</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">3. Uso consentito</h2>
          <p>L'utente si impegna a pubblicare solo recensioni veritiere basate su esperienze personali.</p>
          <p>È vietato inserire contenuti offensivi, diffamatori, ingannevoli, illegali o non conformi alla normativa vigente.</p>
          <p>L'utente garantisce di avere tutti i diritti e le autorizzazioni necessarie per pubblicare i contenuti inseriti.</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">4. Responsabilità dell'utente</h2>
          <p>L'utente è l'unico responsabile dei contenuti pubblicati e accetta di manlevare e tenere indenne il sito e i suoi gestori da qualsiasi reclamo, responsabilità o danno derivante dalle recensioni inserite.</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">5. Moderazione e rimozione contenuti</h2>
          <p>Ci riserviamo il diritto di rimuovere, modificare o bloccare contenuti che:</p>
          <ul>
            <li>Non rispettano questi Termini e Condizioni;</li>
            <li>Siano segnalati come falsi, offensivi o illegali;</li>
            <li>Violino i diritti di terze parti.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">6. Segnalazione abusi</h2>
          <p>Gli utenti possono segnalare contenuti inappropriati utilizzando l'apposito strumento presente sul sito. Le segnalazioni saranno valutate e, se necessario, i contenuti saranno rimossi.</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">7. Privacy e trattamento dei dati</h2>
          <p>Il sito rispetta la normativa vigente in materia di protezione dei dati personali (GDPR, ove applicabile). I dati forniti dagli utenti saranno utilizzati esclusivamente per le finalità legate alla gestione della piattaforma. Per maggiori dettagli, consultare la nostra [Informativa sulla Privacy].</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">8. Limitazione di responsabilità</h2>
          <p>Il sito non è responsabile per:</p>
          <ul>
            <li>Contenuti pubblicati dagli utenti;</li>
            <li>Danni o perdite derivanti dall'uso delle recensioni pubblicate;</li>
            <li>Qualsiasi controversia tra utenti e clienti recensiti.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">9. Modifiche ai Termini e Condizioni</h2>
          <p>Ci riserviamo il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento. Gli utenti saranno informati di eventuali modifiche rilevanti attraverso avvisi sul sito.</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">10. Legge applicabile e foro competente</h2>
          <p>Questi Termini e Condizioni sono regolati dalla legge italiana. Per qualsiasi controversia derivante dall'uso del sito, il foro competente sarà quello del luogo di residenza del titolare del sito.</p>

          <p className="mt-8">Ultimo aggiornamento: {currentDate}</p>
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Torna alla ricerca clienti
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Terms;