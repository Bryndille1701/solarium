import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import Modal from 'react-modal';

type ModalPageProps = {
  bodies?: any[];
  previous?: string;
  title?: string;
  destinataires?: any;
};

Modal.setAppElement('#__next');

// Composant d'affichage de la modale et du contenu de page
const ModalPage = ({ bodies, title }: ModalPageProps) => {
  const router = useRouter();
  const [body, setBody] = useState<string | string[]>('');
  const [page, setPage] = useState<any | Boolean>({});

  useEffect(() => {
    if (!!router.query.body) {
      setBody(router.query.body);
      setPage(
        bodies ? bodies.find((body) => body.id === router.query.body) : false
      );
    }
  }, [router.query.body, page]);
  return (
    <Modal
      isOpen={!!router.query.body}
      onRequestClose={() => {
        router.push(router.route);
      }}
      closeTimeoutMS={500}
      className="modal"
      overlayClassName={{
        base: 'modal-overlay',
        afterOpen: 'modal-overlay__after-open',
        beforeClose: 'modal-overlay__before-close',
      }}
    >
      <button
        className="modal-close"
        onClick={() => {
          router.push(router.route);
        }}
      >
        Fermer
      </button>
      {page && JSON.stringify(page)}
    </Modal>
  );
};

export default ModalPage;
