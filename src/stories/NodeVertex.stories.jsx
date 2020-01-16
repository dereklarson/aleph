import React from 'react';
import NodeVertex from '../diagram/NodeVertex';

const TestComponent = NodeVertex

export default {
  component: TestComponent,
  title: TestComponent.displayName,
  excludeStories: /.*Data$/,
};

export const testData = {
  name: 'Test Node',
  sections: ['react'],
  id: 1,
  styleProps: {
    highlighted: false,
    isDragging: false,
    building: false,
    prepared: false,
  }
}
export const noName = () => <TestComponent {...testData}
  name='' />;
export const longName = () => <TestComponent {...testData}
  name='Cornelius Scipio Africanus' />;
export const noSections = () => <TestComponent {...testData}
  sections={[]} />;
export const manySections = () => <TestComponent {...testData}
  sections={['Cornelius', 'Fabius', 'Julius', 'Quinctius', 'Cato']} />;
export const dragging = () => <TestComponent {...testData}
  styleProps={{isDragging: true}} />;
export const highlighted = () => <TestComponent {...testData}
  styleProps={{highlighted: true}} />;
export const building = () => <TestComponent {...testData}
  styleProps={{building: true}} />;
export const prepared = () => <TestComponent {...testData}
  styleProps={{prepared: true}} />;
