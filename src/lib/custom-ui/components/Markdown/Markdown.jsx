/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const Markdown = React.memo(({ linkStopPropagation, ...props }) => {
  const handleLinkClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const linkRenderer = useCallback(
    /* eslint-disable jsx-a11y/anchor-has-content,
                      jsx-a11y/click-events-have-key-events,
                      jsx-a11y/no-static-element-interactions,
                      react/jsx-props-no-spreading */
    ({ node, ...linkProps }) => <a {...linkProps} onClick={handleLinkClick} />,
    /* eslint-enable jsx-a11y/anchor-has-content,
                     jsx-a11y/click-events-have-key-events,
                     jsx-a11y/no-static-element-interactions,
                     react/jsx-props-no-spreading */
    [handleLinkClick],
  );

  let renderers;

  if (linkStopPropagation) {
    renderers = {
      link: linkRenderer,
    };
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ReactMarkdown {...props} plugins={[gfm]} renderers={renderers}>{props.source}</ReactMarkdown>;
});

Markdown.propTypes = {
  linkStopPropagation: PropTypes.bool,
  source: PropTypes.string.isRequired
};

Markdown.defaultProps = {
  linkStopPropagation: false,
};

export default Markdown;
