import React from 'react';
import ButtonList from '../../button-list';

function Footer(props) {
  const { data } = props;

  const buttons = React.useMemo(() => {
    return [
      {
        key: 'reset',
        props: ({ resetButtonProps }) => ({
          children: '重置',
          ...resetButtonProps,
        }),
        space: 'full',
        onClick: ({ onReset, ...data }) => onReset(data),
      },
      {
        key: 'previous',
        props: { children: '上一步' },
        hidden: ({ hasSteps, isFirstStep }) => !hasSteps || isFirstStep,
        onClick: ({ onPrevious, ...data }) => onPrevious(data),
      },
      {
        key: 'next',
        props: ({ showSubmit }) => ({
          type: showSubmit ? 'default' : 'primary',
          children: '下一步',
        }),
        hidden: ({ hasSteps, isLastStep }) => !hasSteps || isLastStep,
        onClick: ({ onNext, ...data }) => onNext(data),
      },
      {
        key: 'submit',
        props: ({ loading, okButtonProps }) => ({
          type: 'primary',
          loading,
          children: '提交',
          ...okButtonProps,
        }),
        hidden: ({ showSubmit }) => !showSubmit,
        onClick: ({ onSubmit, ...data }) => onSubmit(data),
      },
    ];
  }, []);

  return (
    <ButtonList access={false} type="button" buttons={buttons} data={data} />
  );
}

export default Footer;
