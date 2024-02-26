import onChange from 'on-change';

const observers = (obj) => {
  let index = 0;
  const watchState = onChange(
    obj,
    (path, value, previousValue, applyData) => {
      //alert('value change...');
      console.log('Object changed:', ++index);
      console.log('this:', this);
      console.log('path:', path);
      console.log('value:', value);
      console.log('previousValue:', previousValue);
      console.log('applyData:', applyData);
    }
  );
  return watchState;
};

export default observers;
