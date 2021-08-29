import './index.css';

import classNames from 'classnames';
import { Button } from 'components/Button';
import DecoderText from 'components/DecoderText';
import Divider from 'components/Divider';
import Heading from 'components/Heading';
import Icon from 'components/Icon';
import Input from 'components/Input';
import Section from 'components/Section';
import Text from 'components/Text';
import { tokens } from 'components/ThemeProvider/theme';
import { useFormInput, useRouteTransition, useScrollRestore } from 'hooks';
import { useCallback, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Transition, TransitionGroup } from 'react-transition-group';
import prerender from 'utils/prerender';
import { msToNum, numToMs, numToPx } from 'utils/style';
import { isVisible, reflow } from 'utils/transition';

const initDelay = tokens.base.durationS;

function getStatusError({
  status,
  errorMessage,
  fallback = 'Il y a un probleme avec votre requete',
}) {
  if (status === 200) return false;

  const statuses = {
    500: 'Il y a un probleme avec le serveur, veuillez reesayer ulterieurement',
    404: 'Il y a eu un problème de connexion au serveur. Assurez-vous que vous êtes connecté à internet',
  };

  if (errorMessage) {
    return errorMessage;
  }

  return statuses[status] || fallback;
}

function getDelay(delayMs, initDelayMs = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return { '--delay': numToMs((msToNum(initDelayMs) + numDelay).toFixed(0)) };
}

const Contact = () => {
  const { status } = useRouteTransition();
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const [sending, setSending] = useState(false);
  const [complete, setComplete] = useState(false);
  const [statusError, setStatusError] = useState('');
  useScrollRestore();

  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      setStatusError('');

      if (sending) return;

      try {
        setSending(true);

        const response = await fetch('https://formspree.io/f/xyyllgjl', {
          method: 'POST',
          mode: 'cors',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.value,
            message: message.value,
          }),
        });

        const responseMessage = await response.json();

        const statusError = getStatusError({
          status: response?.status,
          errorMessage: responseMessage?.error,
          fallback: 'Il y a eu un problème pour envoyer votre message',
        });

        if (statusError) throw new Error(statusError);

        setComplete(true);
        setSending(false);
      } catch (error) {
        setSending(false);
        setStatusError(error.message);
      }
    },
    [email.value, message.value, sending]
  );

  return (
    <Section className={classNames('contact', `contact--${status}`)}>
      <Helmet>
        <title>Contact | Sabri Arrar</title>
        <meta
          name="description"
          content="Envoyez-moi un message si vous souhaitez discuter d'un projet ou si vous voulez simplement me dire bonjour."
        />
      </Helmet>
      <TransitionGroup component={null}>
        {!complete && (
          <Transition appear mountOnEnter unmountOnExit timeout={1600} onEnter={reflow}>
            {status => (
              <form className="contact__form" method="post" onSubmit={onSubmit}>
                <Heading
                  className={classNames('contact__title', `contact__title--${status}`, {
                    'contact__title--hidden': prerender,
                  })}
                  level={3}
                  as="h1"
                  style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
                >
                  <DecoderText
                    text="Contactez moi 🙂"
                    start={status !== 'exited' && !prerender}
                    delay={300}
                  />
                </Heading>
                <Divider
                  className={classNames(
                    'contact__divider',
                    `contact__divider--${status}`,
                    { 'contact__divider--hidden': prerender }
                  )}
                  style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
                />
                <Input
                  required
                  className={classNames('contact__input', `contact__input--${status}`, {
                    'contact__input--hidden': prerender,
                  })}
                  style={getDelay(tokens.base.durationXS, initDelay)}
                  autoComplete="email"
                  label="Votre Email"
                  type="email"
                  maxLength={512}
                  {...email}
                />
                <Input
                  required
                  multiline
                  className={classNames('contact__input', `contact__input--${status}`, {
                    'contact__input--hidden': prerender,
                  })}
                  style={getDelay(tokens.base.durationS, initDelay)}
                  autoComplete="off"
                  label="Message"
                  maxLength={4096}
                  {...message}
                />
                <TransitionGroup component={null}>
                  {!!statusError && (
                    <Transition timeout={msToNum(tokens.base.durationM)}>
                      {errorStatus => (
                        <div
                          className={classNames(
                            'contact__form-error',
                            `contact__form-error--${errorStatus}`
                          )}
                          style={{
                            '--height': isVisible(errorStatus)
                              ? numToPx(errorRef.current?.getBoundingClientRect().height)
                              : '0px',
                          }}
                        >
                          <div className="contact__form-error-content" ref={errorRef}>
                            <div className="contact__form-error-message">
                              <Icon className="contact__form-error-icon" icon="error" />
                              {statusError}
                            </div>
                          </div>
                        </div>
                      )}
                    </Transition>
                  )}
                </TransitionGroup>
                <Button
                  className={classNames('contact__button', `contact__button--${status}`, {
                    'contact__button--hidden': prerender,
                    'contact__button--sending': sending,
                  })}
                  style={getDelay(tokens.base.durationM, initDelay)}
                  disabled={sending}
                  loading={sending}
                  loadingText="Sending..."
                  icon="send"
                  type="submit"
                >
                  Envoyer
                </Button>
              </form>
            )}
          </Transition>
        )}
        {complete && (
          <Transition appear mountOnEnter unmountOnExit onEnter={reflow} timeout={0}>
            {status => (
              <div className="contact__complete" aria-live="polite">
                <Heading
                  level={3}
                  as="h3"
                  className={classNames(
                    'contact__complete-title',
                    `contact__complete-title--${status}`
                  )}
                >
                  Message Envoye
                </Heading>
                <Text
                  size="l"
                  className={classNames(
                    'contact__complete-text',
                    `contact__complete-text--${status}`
                  )}
                  style={getDelay(tokens.base.durationXS)}
                >
                  Je vous répondrai le plus rapidement possible
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className={classNames(
                    'contact__complete-button',
                    `contact__complete-button--${status}`
                  )}
                  style={getDelay(tokens.base.durationM)}
                  href="/"
                  icon="chevronRight"
                >
                  Retour au menu
                </Button>
              </div>
            )}
          </Transition>
        )}
      </TransitionGroup>
    </Section>
  );
};

export default Contact;
