import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Card from './components/Cards';
import LocationService from './services/LocationService';
import { getCurrentWeatherLoadingSelector } from './store/selectors/currentWeather.selectors';
import { fetchCurrentWeather } from './store/actions/currentWeather.actions';
import { IWeather } from './types/weather.types';
import { getCardsLoadingSelector, getCardsSelector } from './store/selectors/cards.selectors';
import { dragCard } from './store/actions/cards.actions';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const isLoading: boolean = useSelector(getCurrentWeatherLoadingSelector);
  const cards = useSelector(getCardsSelector);
  const isCardLoading = useSelector(getCardsLoadingSelector);

  useEffect(() => {
    (async () => {
      const { latitude, longitude } = await LocationService.getCurrentCoordinates();
      dispatch(fetchCurrentWeather(latitude, longitude));
    })();
  }, []);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const index = result.source.index;
    const destinationIndex = result.destination.index;
    dispatch(dragCard(index, destinationIndex));
  };

  return (
    <BrowserRouter>
      {isLoading ? (
        <div className="loader">
          <Loader type="TailSpin" color="#2d3060" height={80} width={80} />
        </div>
      ) : (
        <>
          <div className="content">
            <Header />
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="cards">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <TransitionGroup>
                      {cards.map((card: IWeather, index: number) => (
                        <CSSTransition key={card.id} timeout={600} classNames="card">
                          <Draggable key={card.id} draggableId={`${card.id}`} index={index}>
                            {(provided) => (
                              <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                <Card weather={card} />
                              </div>
                            )}
                          </Draggable>
                        </CSSTransition>
                      ))}
                      {provided.placeholder}
                    </TransitionGroup>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <ToastContainer />
          </div>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
