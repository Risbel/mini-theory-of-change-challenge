import React from "react";
import ColumnCardWrapper from "./ColumnCardWrapper";
import Column from "./Column";

const ToCBoardCard = ({
  directOutcomes = [],
  indirectOutcomes = [],
  ultimateImpact = [],
  onDirectOutcomesChange = () => {},
  onIndirectOutcomesChange = () => {},
  onUltimateImpactChange = () => {},
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ColumnCardWrapper
        className="h-[400px]"
        title="Programmes"
        description="Sets of activities we deliver"
        pillText="Zone of control"
      >
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quisquam, quos.
        </p>
      </ColumnCardWrapper>

      <ColumnCardWrapper
        className="h-[400px]"
        title="Direct outcomes"
        description="Changes we influence directly"
        pillText="Zone of direct influence"
      >
        <Column items={directOutcomes} onItemsChange={onDirectOutcomesChange} />
      </ColumnCardWrapper>

      <ColumnCardWrapper
        className="h-[400px]"
        title="Indirect outcomes"
        description="What we contribute over time"
        pillText="Zone of indirect influence"
        isDotted={true}
      >
        <Column items={indirectOutcomes} onItemsChange={onIndirectOutcomesChange} />
      </ColumnCardWrapper>

      <ColumnCardWrapper
        className="h-[400px]"
        title="Ultimate impact"
        description="The lasting change we seek"
        pillText="Zone of contribution"
        isDotted={true}
      >
        <Column items={ultimateImpact} onItemsChange={onUltimateImpactChange} />
      </ColumnCardWrapper>
    </div>
  );
};

export default ToCBoardCard;
