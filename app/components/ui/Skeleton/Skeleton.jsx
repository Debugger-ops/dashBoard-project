import './Skeleton.css';

export default function Skeleton({
  type = 'text',
  width,
  height,
  count = 1,
  className = '',
}) {
  const skeletonClasses = `
    skeleton 
    skeleton-${type}
    ${className}
  `;

  const style = {
    width: width,
    height: height,
  };

  const renderSkeleton = () => {
    if (type === 'circle') {
      return <div className={skeletonClasses} style={style} />;
    }

    if (type === 'avatar') {
      return <div className={skeletonClasses} style={style} />;
    }

    const skeletons = [];
    for (let i = 0; i < count; i++) {
      skeletons.push(
        <div key={i} className={skeletonClasses} style={style} />
      );
    }
    return skeletons;
  };

  return <>{renderSkeleton()}</>;
}