import {
  Children,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { SxProps } from '@mui/material/styles';

// TODO: evaluate other swipe libs:
// https://react-swipeable-views.com/getting-started/installation/ - currently it doesn't support React 18 and can be installed only with npm i react-swipeable-views --legacy-peer-deps. Probably it doesn't compile on Github
// https://github.com/FormidableLabs/nuka-carousel
// https://github.com/akiran/react-slick
// https://github.com/express-labs/pure-react-carousel - thin size (good)

// TODO: Test other swipe effects: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
// See https://www.youtube.com/watch?v=n0Rl-SsTVKc for a tutorial
// https://codesandbox.io/s/jgkmw?file=/src/SwiperCoverflow.jsx
// TODO: Test vertical direction
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

// import { EffectFade } from "swiper";
// import "swiper/css/effect-fade";

// import { EffectCube } from "swiper";
// import "swiper/css/effect-cube";

// import { EffectCoverflow } from "swiper";
// import "swiper/css/effect-coverflow";

// import { EffectFlip } from "swiper";
// import "swiper/css/effect-flip";

// import { EffectCreative } from "swiper";
// import "swiper/css/effect-creative";

// import { EffectCards } from "swiper";
// import "swiper/css/effect-cards";

// import {
//   Navigation,
//   Pagination,
// } from "swiper";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

import Stepper from '../Stepper/Stepper';
import StepperContext from '../StepperContext/StepperContext';
import { useFullscreen, useToggle } from 'react-use';

interface StepperSectionProps extends PropsWithChildren {
  header?: ReactNode;
  navLabels?: string[];
  handleBackFirst?: () => void;
  handleNextLast?: () => void;
  sx?: SxProps;
}

export const StepperSection = forwardRef<HTMLDivElement, StepperSectionProps>(
  (props: StepperSectionProps, ref) => {
    const { header, navLabels, handleBackFirst, handleNextLast, sx, children } =
      props;
    const arrayChildren = Children.toArray(children);

    const headerHeight = header ? 80 : 0;
    const footerHeight = '80px';

    const sectionRef = useRef(null);
    const [show, toggle] = useToggle(false);
    useFullscreen(sectionRef, show, {
      onClose: () => toggle(false),
    });

    const [activeStep, setActiveStep] = useState(0);
    // Keeps the active component name on the stepper context
    const [activeComponentName, setActiveComponentName] = useState<string>();

    const [swiper, setSwiper] = useState<SwiperType>();

    const handleSlideChange = () => {
      setActiveStep(swiper?.activeIndex || 0);
    };

    const handleNext = () => {
      if (activeStep === arrayChildren.length - 1) {
        handleNextLast?.();
      } else {
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setActive(activeStep + 1);
        swiper?.slideNext();
      }
    };

    const handleBack = () => {
      if (activeStep === 0) {
        handleBackFirst?.();
      } else {
        // setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setActive(activeStep - 1);
        swiper?.slidePrev();
      }
    };

    const setActive = (newActiveStep: number) => {
      setActiveStep(newActiveStep);
      const type = (arrayChildren[newActiveStep] as ReactElement).type;
      const typeName = typeof type === 'string' ? type : type.name;
      setActiveComponentName(typeName);
    };

    const initSwiper = () => {
      const type = (arrayChildren[0] as ReactElement).type;
      const typeName = typeof type === 'string' ? type : type.name;
      setActiveComponentName(typeName);
    };

    return (
      <StepperContext.Provider
        value={{
          activeStep,
          activeComponentName,
        }}
      >
        <Container
          // component="div"
          ref={sectionRef}
          maxWidth={false}
          disableGutters
          sx={sx}
        >
          {header}
          <Grid
            container
            justifyContent="center"
            sx={{
              height: `calc(100% - ${headerHeight}px)`,
            }}
          >
            <Swiper
              // modules={[Navigation, Pagination]}
              // modules={[
              //   EffectFade,
              //   EffectCube,
              //   EffectCoverflow,
              //   EffectFlip,
              //   EffectCreative,
              //   EffectCards,
              // ]}
              onInit={initSwiper}
              onSwiper={setSwiper}
              onSlideChange={handleSlideChange}
              grabCursor
              // initialSlide={activeStep}
              //
              // direction="vertical"
              //
              effect="slide" // 'slide' (default) | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
              // height={height} // should be used with some effects?
              // flipEffect
            >
              {Children.map(arrayChildren, (child, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Grid
                      item
                      xs={12}
                      sx={{ height: `calc(100%-${footerHeight})` }}
                    >
                      {child}
                    </Grid>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Grid
              container
              item
              justifyContent="center"
              sm={12}
              sx={{
                height: footerHeight,
              }}
            >
              <Stepper
                activeStep={activeStep}
                maxSteps={arrayChildren.length}
                handleNext={handleNext}
                handleBack={handleBack}
                backLabel={
                  navLabels && navLabels.length - 1 >= activeStep
                    ? navLabels[activeStep]
                    : undefined
                }
                nextLabel={
                  navLabels && navLabels.length >= activeStep + 2
                    ? navLabels[activeStep + 2]
                    : undefined
                }
                hasFirstBack={!!navLabels}
                hasNextLast={
                  navLabels !== undefined &&
                  navLabels.length > arrayChildren.length + 1
                }
              />
            </Grid>
          </Grid>
        </Container>
      </StepperContext.Provider>
    );
  },
);

export default StepperSection;
