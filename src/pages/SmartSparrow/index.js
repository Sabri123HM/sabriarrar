import { Fragment, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useAppContext, useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import {
  ProjectContainer,
  ProjectSection,
  ProjectSectionContent,
  ProjectTextRow,
  ProjectImage,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectBackground,
  ProjectHeader,
  ProjectSectionColumns,
} from 'components/ProjectLayout';
import ThemeProvider, { useTheme } from 'components/ThemeProvider';
import Image from 'components/Image';
import prerender from 'utils/prerender';
import { media } from 'utils/style';
import backgroundSpr from 'assets/spr-background.jpg';
import backgroundSprLarge from 'assets/spr-background-large.jpg';
import backgroundSprPlaceholder from 'assets/spr-background-placeholder.jpg';
import imageSprLessonBuilderLight from 'assets/spr-lesson-builder-light.jpg';
import imageSprLessonBuilderLightLarge from 'assets/spr-lesson-builder-light-large.jpg';
import imageSprLessonBuilderLightPlaceholder from 'assets/spr-lesson-builder-light-placeholder.jpg';
import imageSprLessonBuilderDark from 'assets/spr-lesson-builder-dark.jpg';
import imageSprLessonBuilderDarkLarge from 'assets/spr-lesson-builder-dark-large.jpg';
import imageSprLessonBuilderDarkPlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import imageSprStoryboarderDark from 'assets/spr-storyboarder-dark.png';
import imageSprStoryboarderDarkLarge from 'assets/spr-storyboarder-dark-large.png';
import imageSprStoryboarderDarkPlaceholder from 'assets/spr-storyboarder-dark-placeholder.png';
import imageSprStoryboarderLight from 'assets/spr-storyboarder-light.png';
import imageSprStoryboarderLightLarge from 'assets/spr-storyboarder-light-large.png';
import imageSprStoryboarderLightPlaceholder from 'assets/spr-storyboarder-light-placeholder.png';
import imageSprSchema1Light from 'assets/spr-schema-1-light.png';
import imageSprSchema1LightLarge from 'assets/spr-schema-1-light-large.png';
import imageSprSchema1LightPlaceholder from 'assets/spr-schema-1-light-placeholder.png';
import imageSprSchema1Dark from 'assets/spr-schema-1-dark.png';
import imageSprSchema1DarkLarge from 'assets/spr-schema-1-dark-large.png';
import imageSprSchema1DarkPlaceholder from 'assets/spr-schema-1-dark-placeholder.png';
import imageSprSchema2Light from 'assets/spr-schema-2-light.png';
import imageSprSchema2LightLarge from 'assets/spr-schema-2-light-large.png';
import imageSprSchema2LightPlaceholder from 'assets/spr-schema-2-light-placeholder.png';
import imageSprSchema2Dark from 'assets/spr-schema-2-dark.png';
import imageSprSchema2DarkLarge from 'assets/spr-schema-2-dark-large.png';
import imageSprSchema2DarkPlaceholder from 'assets/spr-schema-2-dark-placeholder.png';
import Earth, { EarthSection } from './Earth';
import './index.css';

const title = 'A propos de moi';
const description =
  "Passionné d'informatique, je poursuis actuellement mon master au sein du lycée ORT de Toulouse. ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  Je suis en recherche active d'une entreprise spécialisée dans la programmation informatique afin poursuivre ma formation en \"Master des solutions Digitales\".  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ Mon profil s'oriente à ce jour sur la programmation WEB avec très fort désir d'intégrer une équipe dynamique et monter en compétence sur les nouvelles technologies.";
const roles = [
  ' ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢ ⁢Formations ',
  'Bachelor Concepteur de Systèmes D’Information,⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢  Lycée ORT, Colomiers (31)',
  'Brevet de Technicien Supérieur Services informatiques aux Organisations,   ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢    ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢    ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢    ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢    ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢ ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢Lycée Henri Matisse, Cugnaux (31)',
  'Baccalauréat Professionnel Electrotechnique Energie Equipements Communicants, ⁢⁢⁢⁢⁢  ⁢⁢⁢⁢⁢   Lycée Eugene Montel, Colomiers (31)',
];

const ProjectSPR = () => {
  const { themeId } = useTheme();
  const { dispatch } = useAppContext();
  const motionSectionRef = useRef();
  const earthSectionRef = useRef();
  useScrollRestore();

  const isDark = themeId === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    dispatch({ type: 'setTheme', value: themes[index] });
  };

  return (
    <Fragment>
      <ProjectContainer className="spr">
        <Helmet>
          <title>{`Arrar Sabri | ${title}`}</title>
          <meta name="description" content={description} />
        </Helmet>
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          srcSet={`${backgroundSpr} 1080w, ${backgroundSprLarge} 2160w`}
          placeholder={backgroundSprPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.mediafire.com/file/7pco3juehxs9wt9/cv_arrar_sabri_2021.pdf/file"
          roles={roles}
        />
        <ProjectSection first>
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={themeId}
              srcSet={`${
                isDark ? imageSprLessonBuilderDark : imageSprLessonBuilderLight
              } 1280w, ${
                isDark ? imageSprLessonBuilderDarkLarge : imageSprLessonBuilderLightLarge
              } 2560w`}
              placeholder={
                isDark
                  ? imageSprLessonBuilderDarkPlaceholder
                  : imageSprLessonBuilderLightPlaceholder
              }
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="The aero lesson builder app dragging an audio component into a screen about plant cells."
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ThemeProvider themeId="dark">
          <Earth
            className="spr__earth"
            hideMeshes={useMemo(
              () => ['Atmosphere', 'EarthPartial', 'Chunk', 'EarthFull'],
              []
            )}
            position={useMemo(() => [0, 0, 0], [])}
            ref={earthSectionRef}
            labels={useMemo(
              () => [
                {
                  position: [0.54, 0.19, 0.18],
                  text: 'HTML',
                  hidden: true,
                },
                {
                  position: [0.47, -0.38, 0.04],
                  text: 'CSS, Bootstrap',
                  hidden: true,
                },
                {
                  position: [0.22, 0.44, -0.35],
                  text: 'JavaScript',
                  hidden: true,
                },
                {
                  position: [0.16, -0.06, 0.58],
                  text: 'NodeJS',
                  hidden: true,
                },
                {
                  position: [0.11, 0.2, -0.56],
                  text: 'Angular',
                  hidden: true,
                },
                /* {
                  position: [0.52, 0.2, -0.23],
                  text: 'Kīlauea',
                  hidden: true,
                },*/
                {
                  position: [-0.24, 0.75, 0.24],
                  text: 'Python',
                  delay: 800,
                  hidden: true,
                },
                {
                  position: [-0.24, 0.55, 0.24],
                  text: 'Java, C#, C++',
                  delay: 800,
                  hidden: true,
                },
                {
                  position: [-0.24, 0.35, 0.24],
                  text: 'PHP, MYSQL',
                  delay: 800,
                  hidden: true,
                },
              ],
              []
            )}
            scale={0.6}
          >
            <EarthSection
              scrim
              animations={['0:loop']}
              camera={[0, 0, 1.5]}
              meshes={['Atmosphere', 'EarthFull']}
            >
              <ProjectSection>
                <ProjectSectionContent>
                  <ProjectTextRow center>
                    <ProjectSectionHeading>Competences</ProjectSectionHeading>
                    <ProjectSectionText>
                      Mes expériences professionnelles me permettent d'être aujourd'hui
                      d'être autonome, polyvalent et de disposer des compétences
                      techniques dont voici un aperçu :
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[0, 0, 2.4]}
              meshes={['Atmosphere', 'EarthFull']}
            />
            <EarthSection
              animations={['0:loop']}
              camera={[1.14, -1.39, 0.94]}
              meshes={['Atmosphere', 'EarthFull']}
            >
              <ProjectSection>
                <ProjectSectionContent width="xl">
                  <ProjectTextRow justify="end" width="s">
                    <ProjectSectionHeading level={4} as="h3">
                      Outils de gestion de projet
                    </ProjectSectionHeading>
                    <ProjectSectionText>
                      J'ai appri durant mon parcours à utiliser des outils afin de
                      faciliter le travail de gestion de
                      projet.                                                                         
                      Comme Git, qui considéré comme un service d’hébergement de projets
                      en cours de développement, ou encore Trello qui repose sur une
                      organisation des projets en planches listant des cartes, chacune
                      représentant des tâches.
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[1.17, 0.69, -1.47]}
              meshes={['Atmosphere', 'EarthFull']}
              labels={[
                'HTML',
                'CSS, Bootstrap',
                'JavaScript',
                'NodeJS',
                'Angular',
                //'Kīlauea',
              ]}
            >
              <ProjectSection>
                <ProjectSectionContent width="xl">
                  <ProjectTextRow justify="start" width="s">
                    <ProjectSectionHeading level={4} as="h3">
                      Front-End
                    </ProjectSectionHeading>
                    <ProjectSectionText>
                      Le développeur Front-End fait référence à l’ensemble des éléments
                      visibles et accessibles directement sur un site web
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[1.81, 0.51, 0.43]}
              meshes={['Atmosphere', 'EarthFull']}
              labels={[
                'HTML',
                'CSS, Bootstrap',
                'JavaScript',
                'NodeJS',
                'Angular',
                // 'Kīlauea',
              ]}
            />
            <EarthSection
              animations={['0:loop']}
              camera={[0.37, 1.02, 1.84]}
              meshes={['EarthPartial', 'Chunk']}
              labels={['Python', 'Java, C#, C++', 'PHP, MYSQL']}
            >
              <ProjectSection>
                <ProjectSectionContent width="xl">
                  <ProjectTextRow justify="end" width="s">
                    <ProjectSectionHeading level={4} as="h3">
                      Back-End
                    </ProjectSectionHeading>
                    <ProjectSectionText>
                      Le développeur Back-End maîtrise toute la partie invisible pour
                      l’utilisateur, mais qui va permettre le bon fonctionnement d’un site
                      internet
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              scrimReverse
              animations={['0:loop']}
              camera={[0.37, 1.02, 1.84]}
              meshes={['Atmosphere', 'EarthFull']}
            />
          </Earth>
        </ThemeProvider>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default ProjectSPR;
