import { Fragment } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { Helmet } from 'react-helmet';
import { Button } from 'components/Button';
import DecoderText from 'components/DecoderText';
import Notfound from 'assets/notfound.mp4';
import NotfoundPoster from 'assets/notfound.jpg';
import { reflow } from 'utils/transition';
import Heading from 'components/Heading';
import Text from 'components/Text';
import './index.css';

function NotFound() {
  return (
    <section className="page-404">
      <Helmet>
        <title tag="title">404 | Page non trouvée</title>
        <meta
          name="description"
          content="404 page pas trouvée. Cette page n'existe pas"
        />
      </Helmet>
      <Transition appear in={true} timeout={0} onEnter={reflow}>
        {status => (
          <Fragment>
            <div className="page-404__details">
              <div className="page-404__text">
                <Heading
                  className={classNames('page-404__title', `page-404__title--${status}`)}
                  level={0}
                >
                  404
                </Heading>
                <Heading
                  aria-hidden
                  className={classNames(
                    'page-404__subheading',
                    `page-404__subheading--${status}`
                  )}
                  as="h2"
                  level={3}
                >
                  <DecoderText
                    text="Error: NOT FOUND"
                    start={status !== 'exited'}
                    delay={300}
                  />
                </Heading>
                <Text
                  className={classNames(
                    'page-404__description',
                    `page-404__description--${status}`
                  )}
                >
                  Cette page n'a pas pu être trouvée. Soit elle n'existe pas, soit elle a
                  été supprimée. Ou peut-être que vous n'existez pas.
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className={classNames(
                    'page-404__button',
                    `page-404__button--${status}`
                  )}
                  href="/"
                  icon="chevronRight"
                >
                  Retour vers le menu
                </Button>
              </div>
            </div>

            <div
              className={classNames(
                'page-404__video-container',
                `page-404__video-container--${status}`
              )}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className={classNames('page-404__video', `page-404__video--${status}`)}
                poster={NotfoundPoster}
              >
                <source src={Notfound} type="video/mp4" />
              </video>
            </div>
          </Fragment>
        )}
      </Transition>
    </section>
  );
}

export default NotFound;
