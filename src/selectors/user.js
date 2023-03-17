import { createSelector } from 'redux-orm';

import orm from '../orm';
import { isLocalId } from '../utils/local-id';

export const currentUserIdSelector = ({ auth: { userId } }) => userId;

export const currentUserSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ User }, id) => {
    if (!id) {
      return id;
    }

    const userModel = User.withId(id);

    if (!userModel) {
      return userModel;
    }

    return userModel.ref;
  },
);

export const projectsForCurrentUserSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ User }, id) => {
    if (!id) {
      return id;
    }

    const userModel = User.withId(id);

    if (!userModel) {
      return userModel;
    }

    // // Hmmm .... function does not exists ?
    return userModel.getOrderedAvailableProjectsModelArray().map((projectModel) => {
      const boardsModels = projectModel.getOrderedAvailableBoardsModelArray(userModel.id);

      let notificationsTotal = 0;
      boardsModels.forEach((boardModel) => {
        boardModel.cards.toModelArray().forEach((cardModel) => {
          notificationsTotal += cardModel.getUnreadNotificationsQuerySet().count();
        });
      });

      return {
        ...projectModel.ref,
        notificationsTotal,
        firstBoardId: boardsModels[0] && boardsModels[0].id,
      };
    });
  },
);

export const projectsToListsForCurrentUserSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ User }, id) => {
    if (!id) {
      return id;
    }

    const userModel = User.withId(id);

    if (!userModel) {
      return userModel;
    }

    return userModel.getOrderedAvailableProjectsModelArray().map((projectModel) => ({
      ...projectModel.ref,
      boards: projectModel.getOrderedMemberBoardsModelArray(id).map((boardModel) => ({
        ...boardModel.ref,
        lists: boardModel.getOrderedListsQuerySet().toRefArray(),
      })),
    }));
  },
);

export const projectsCreatedByCurrentUserSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ Project }, id) => {
    if (!id) {
      return id;
    }

    return Project.all()
        // .filter(project => project.createdBy === id)
        .filter(project => {

          /*
          console.log('project = ', project);

          if (!project.createdBy) {
            return false;
          }
          if (!project.createdBy.id) {
            return project.createdBy === id;
          }
          return project.createdBy.id === id;
          */

          // // Note : even though createdBy is associated with User
          // // back in the server, we do not populate it there when
          // // fetched via skiddlez/server/api/helpers/get-projects.js.
          // // So createdBy is just a nummber refering to the
          // // user id of the project.
          // // Reason ? To avoid crashing other people's existing code.

          return project.createdBy === id;
        })
        .toModelArray()
        // .map(({ project: projectModel }) => {
        .map(projectModel => {
          const firstBoard = projectModel.boards.first();
          const firstBoardId = firstBoard && firstBoard.id;

          return {
            ...projectModel.ref,
            firstBoardId,
          };
        });
        // .toRefArray();
  },
);

export const projectsAssignedToCurrentUserSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ Project }, id) => {
    if (!id) {
      return id;
    }

    return Project.all()
        // .filter(project => project.createdBy === id)
        .filter(project => {
          return project.createdBy !== id;
        })
        .toModelArray()
        // .map(({ project: projectModel }) => {
        .map(projectModel => {
          const firstBoard = projectModel.boards.first();
          const firstBoardId = firstBoard && firstBoard.id;

          return {
            ...projectModel.ref,
            firstBoardId,
          };
        });
        // .toRefArray();
  },
);

export const projectsFavoritedByCurrentUserSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ User }, id) => {
    if (!id) {
      return id;
    }

    const userModel = User.withId(id);

    if (!userModel) {
      return userModel;
    }

    // // Get memberships where isSubscribe is true
    const pms = userModel
      .getOrderedProjectMembershipsQuerySet()
      .toModelArray()
      .filter(({ isSubscribe: isFaved }) => {
          return isFaved;
      });

    // // Extract project from memberships
    return pms.map(({ project: projectModel }) => {
      const firstBoard = projectModel.boards.first();
      const firstBoardId = firstBoard && firstBoard.id;

      return {
        ...projectModel.ref,
        firstBoardId,
      };
    });
  },
);







export const cardsCreatedByCurrentUserSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ User }, id) => {
    if (!id) {
      return id;
    }

    const userModel = User.withId(id);

    if (!userModel) {
      return userModel;
    }

    const cardsArrayBumpy = userModel
      .getOrderedProjectMembershipsQuerySet()
      .toModelArray()
      .map(({ project: projectModel }) => {
        const cardsArray = [];

        projectModel.boards.toModelArray().forEach((boardModel) => {

          const cardsRefArray = boardModel.cards.toRefArray();

          // cardsArray.push(...cardsRefArray);
          cardsRefArray.forEach(card => {
            if (card.createdBy === id) {
              cardsArray.push(card);
            }
          });
        });

        return cardsArray;
      });

      // console.log('cardsCreatedByCurrentUserSelector : cardsArrayBumpy = ', cardsArrayBumpy);

      const cardsArrayFlat = cardsArrayBumpy.flat();

      // console.log('cardsCreatedByCurrentUserSelector : cardsArrayFlat = ', cardsArrayFlat);

      return cardsArrayFlat;
  },
);

export const cardsAssignedToCurrentUserSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ User }, id) => {
    if (!id) {
      return id;
    }

    const userModel = User.withId(id);

    if (!userModel) {
      return userModel;
    }

    const cardsArrayBumpy = userModel
      .getOrderedProjectMembershipsQuerySet()
      .toModelArray()
      .map(({ project: projectModel }) => {
        const cardsArray = [];

        projectModel.boards.toModelArray().forEach((boardModel) => {

          const cardsRefArray = boardModel.cards.toRefArray();

          // cardsArray.push(...cardsRefArray);
          cardsRefArray.forEach(card => {
            if (card.createdBy !== id) {
              cardsArray.push(card);
            }
          });
        });

        return cardsArray;
      });

      // console.log('cardsAssignedToCurrentUserSelector : cardsArrayBumpy = ', cardsArrayBumpy);

      const cardsArrayFlat = cardsArrayBumpy.flat();

      // console.log('cardsAssignedToCurrentUserSelector : cardsArrayFlat = ', cardsArrayFlat);

      return cardsArrayFlat;
  },
);

export const cardsFavoritedByCurrentUserSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ User }, id) => {
    if (!id) {
      return id;
    }

    const userModel = User.withId(id);

    if (!userModel) {
      return userModel;
    }

    const cardsArrayBumpy = userModel
      .getOrderedProjectMembershipsQuerySet()
      .toModelArray()
      .map(({ project: projectModel }) => {
        const cardsArray = [];

        projectModel.boards.toModelArray().forEach((boardModel) => {

          const cardsRefArray = boardModel.cards.toRefArray();

          const subscribedCards = cardsRefArray.filter(cra => cra.isSubscribed);

          cardsArray.push(...subscribedCards);
        });

        return cardsArray;
      });

      // console.log('cardsFavoritedByCurrentUserSelector : cardsArrayBumpy = ', cardsArrayBumpy);

      const cardsArrayFlat = cardsArrayBumpy.flat();

      // console.log('cardsFavoritedByCurrentUserSelector : cardsArrayFlat = ', cardsArrayFlat);

      return cardsArrayFlat;
  },
);









export const actionsFromAccessibleProjectsSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ User }, id) => {
    if (!id) {
      return id;
    }

    const userModel = User.withId(id);

    if (!userModel) {
      return userModel;
    }

    const currentUserId = id;

    // // Get cards
    const cardsArrayBumpy = userModel
      .getOrderedProjectMembershipsQuerySet()
      .toModelArray()
      .map(({ project: projectModel }) => {
        const cardsArray = [];

        projectModel.boards.toModelArray().forEach((boardModel) => {

          const cardsModelArray = boardModel.cards
            // .toRefArray();
            .toModelArray();

          // console.log('actionsFromAccessibleProjectsSelector BEFORE : cardsModelArray = ', cardsModelArray);

          // // Put the project status so ui components can filter
          const mappedCardsModelArray = cardsModelArray.map(cma => {
            return {
              ...cma.ref,
              projectStatus: projectModel.status,
              actions: cma
                .getOrderedInCardActionsQuerySet()
                .toModelArray(),
            }
          });

          // console.log('actionsFromAccessibleProjectsSelector AFTER  : mappedCardsModelArray = ', mappedCardsModelArray);

          cardsArray.push(...mappedCardsModelArray);
        });

        return cardsArray;
      });

      // console.log('actionsFromAccessibleProjectsSelector : cardsArrayBumpy = ', cardsArrayBumpy);

      const cardsArrayFlat = cardsArrayBumpy.flat();

      // console.log('actionsFromAccessibleProjectsSelector : cardsArrayFlat = ', cardsArrayFlat);



      // // Get actions for cards
      const actionsArrayBumpy = [];

      cardsArrayFlat.forEach((cardModel) => {

        // const cardModel = Card.withId(cardWev.id);

        // console.log('actionsFromAccessibleProjectsSelector : cardModel = ', cardModel);

        // const actionsArray = cardModel
          // .getOrderedInCardActionsQuerySet()
          // .toModelArray()
        const actionsArray = cardModel
          .actions
          .map((actionModel) => ({
            ...actionModel.ref,
            // ...actionModel,
            // // Is this a good idea ?
            projectStatus: cardModel.projectStatus,
            // // Is this a good idea ?
            status: cardModel.status,
            isPersisted: !isLocalId(actionModel.id),
            user: {
              ...actionModel.user.ref,
              // ...actionModel.user,
              isCurrent: actionModel.user.id === currentUserId,
            },
          }));

        // console.log('actionsFromAccessibleProjectsSelector : actionsArray = ', actionsArray);

        actionsArrayBumpy.push(...actionsArray);
      });

      // console.log('actionsFromAccessibleProjectsSelector : actionsArrayBumpy = ', actionsArrayBumpy);

      const actionsArrayFlat = actionsArrayBumpy.flat();

      // console.log('actionsFromAccessibleProjectsSelector : actionsArrayFlat = ', actionsArrayFlat);

      return actionsArrayFlat;
  },
);

export const actionsFromFavoritedProjectsSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ User }, id) => {
    if (!id) {
      return id;
    }

    const userModel = User.withId(id);

    if (!userModel) {
      return userModel;
    }

    const currentUserId = id;

    // // Get memberships where isSubscribe is true
    const pms = userModel
      .getOrderedProjectMembershipsQuerySet()
      .toModelArray()
      .filter(({ isSubscribe: isFaved }) => {
          return isFaved;
      });

    // // Get cards
    const cardsArrayBumpy = pms.map(({ project: projectModel }) => {
      const cardsArray = [];

      projectModel.boards.toModelArray().forEach((boardModel) => {

        const cardsRefArray = boardModel.cards
          // .toRefArray();
          .toModelArray();

        // // Only get cards where user is a member
        const applicableCards = cardsRefArray.filter(
          cra => {
            return cra.users.toRefArray().some(e => e.id === currentUserId);
          });

        // console.log('actionsFromFavoritedCardsSelector BEFORE : applicableCards = ', applicableCards);

        // // Put the project status so ui components can filter
        const mappedSubscribedCards = applicableCards.map(sc => {
          return {
            ...sc.ref,
            projectStatus: projectModel.status,
            actions: sc
              .getOrderedInCardActionsQuerySet()
              .toModelArray(),
          }
        });

        // console.log('actionsFromFavoritedCardsSelector AFTER  : mappedSubscribedCards = ', mappedSubscribedCards);

        cardsArray.push(...mappedSubscribedCards);
      });

      return cardsArray;
    });

    const cardsArrayFlat = cardsArrayBumpy.flat();



    // console.log('actionsFromFavoritedProjectsSelector : cardsArrayFlat = ', cardsArrayFlat);

    // // Get actions for cards
    const actionsArrayBumpy = [];

    cardsArrayFlat.forEach((cardModel) => {

      const actionsArray = cardModel
        .actions
      // const actionsArray = cardModel
        // .getOrderedInCardActionsQuerySet()
        // .toModelArray()
        .map((actionModel) => ({
          ...actionModel.ref,
          // // Is this a good idea ?
          projectStatus: cardModel.projectStatus,
          // // Is this a good idea ?
          status: cardModel.status,
          isPersisted: !isLocalId(actionModel.id),
          user: {
            ...actionModel.user.ref,
            isCurrent: actionModel.user.id === currentUserId,
          },
        }));

      actionsArrayBumpy.push(...actionsArray);
    });

    const actionsArrayFlat = actionsArrayBumpy.flat();

    // console.log('actionsFromFavoritedProjectsSelector : actionsArrayFlat = ', actionsArrayFlat);

    return actionsArrayFlat;
  }
);

export const actionsFromFavoritedCardsSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ User }, id) => {
    if (!id) {
      return id;
    }

    const userModel = User.withId(id);

    if (!userModel) {
      return userModel;
    }

    const currentUserId = id;

    // // Get cards favorited by current user
    const cardsArrayBumpy = userModel
      .getOrderedProjectMembershipsQuerySet()
      .toModelArray()
      .map(({ project: projectModel }) => {
        const cardsArray = [];

        projectModel.boards.toModelArray().forEach((boardModel) => {

          const cardsRefArray = boardModel.cards
            // .toRefArray();
            .toModelArray();

          // // A card is considered subcribed if:
          // // 1) user is a member of the card
          // // 2) isSubscribed is true
          const applicableCards = cardsRefArray.filter(
            cra => {
              return cra.isSubscribed
                && cra.users.toRefArray().some(e => e.id === currentUserId);
            });

          // console.log('actionsFromFavoritedCardsSelector BEFORE : applicableCards = ', applicableCards);

          // // Put the project status so ui components can filter
          const mappedSubscribedCards = applicableCards.map(sc => {
            return {
              ...sc.ref,
              projectStatus: projectModel.status,
              actions: sc
                .getOrderedInCardActionsQuerySet()
                .toModelArray(),
            }
          });

          // console.log('actionsFromFavoritedCardsSelector AFTER  : mappedSubscribedCards = ', mappedSubscribedCards);

          cardsArray.push(...mappedSubscribedCards);
        });

        return cardsArray;
      });

      // console.log('cardsFavoritedByCurrentUserSelector : cardsArrayBumpy = ', cardsArrayBumpy);

      const cardsArrayFlat = cardsArrayBumpy.flat();

      // console.log('cardsFavoritedByCurrentUserSelector : cardsArrayFlat = ', cardsArrayFlat);



      // // Get actions for cards
      const actionsArrayBumpy = [];

      cardsArrayFlat.forEach((cardModel) => {

        // const actionsArray = cardModel
          // .getOrderedInCardActionsQuerySet()
          // .toModelArray()
        const actionsArray = cardModel
          .actions
          .map((actionModel) => ({
            ...actionModel.ref,
            // // Is this a good idea ?
            projectStatus: cardModel.projectStatus,
            // // Is this a good idea ?
            status: cardModel.status,
            isPersisted: !isLocalId(actionModel.id),
            user: {
              ...actionModel.user.ref,
              isCurrent: actionModel.user.id === currentUserId,
            },
          }));

        actionsArrayBumpy.push(...actionsArray);
      });

      const actionsArrayFlat = actionsArrayBumpy.flat();

      return actionsArrayFlat;
  }
);








export const notificationsForCurrentUserSelector = createSelector(
  orm,
  (state) => currentUserIdSelector(state),
  ({ User }, id) => {
    if (!id) {
      return id;
    }

    const userModel = User.withId(id);

    if (!userModel) {
      return userModel;
    }

    return userModel
      .getOrderedUnreadNotificationsQuerySet()
      .toModelArray()
      .map((notificationModel) => ({
        ...notificationModel.ref,
        action: notificationModel.action && {
          ...notificationModel.action.ref,
          user: notificationModel.action.user.ref,
        },
        card: notificationModel.card && notificationModel.card.ref,
      }));
  },
);
