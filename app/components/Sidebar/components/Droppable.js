// @flow
import * as React from "react";
import { Droppable as DnDDroppable } from "react-beautiful-dnd";
import type {
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import styled, { withTheme } from "styled-components";
import {
  DROPPABLE_COLLECTION_SUFFIX,
  DROPPABLE_DOCUMENT_SUFFIX,
  DROPPABLE_DOCUMENT_SEPARATOR,
} from "utils/dnd";

type Props = {
  collectionId: string,
  documentId?: string,
  isDropDisabled?: boolean,
  children(
    provided: DroppableProvided,
    snapshot: DroppableStateSnapshot
  ): React.Node,
};

class Droppable extends React.Component<Props> {
  static defaultProps = {
    isDropDisabled: false,
  };

  render() {
    const { collectionId, documentId, isDropDisabled, children } = this.props;
    let droppableId;

    if (documentId) {
      droppableId = `${DROPPABLE_DOCUMENT_SUFFIX}${documentId}${DROPPABLE_DOCUMENT_SEPARATOR}${collectionId}`;
    } else {
      droppableId = `${DROPPABLE_COLLECTION_SUFFIX}${collectionId}`;
    }

    return (
      <DnDDroppable
        droppableId={droppableId}
        isDropDisabled={isDropDisabled}
        isCombineEnabled={true}
      >
        {(provided, snapshot) => (
          <DropContainer
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {children(provided, snapshot)}
            {provided.placeholder}
          </DropContainer>
        )}
      </DnDDroppable>
    );
  }
}

const DropContainer = styled.div((props) => ({
  backgroundColor: props.isDraggingOver
    ? props.theme.sidebarDroppableBackground
    : undefined,
}));

export default withTheme(Droppable);