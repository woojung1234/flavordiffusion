import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { analyzePairing } from '../utils/api';

const GraphCanvas = ({ data }) => {
  const ref = useRef();
  const [selectedNodes, setSelectedNodes] = useState([]);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 400;

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#aaa')
      .selectAll('line')
      .data(data.links)
      .join('line');

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', 20)
      .attr('fill', d => selectedNodes.includes(d.id) ? '#f39c12' : '#69b3a2')
      .on('click', handleClick)
      .call(drag(simulation));

    const label = svg.append('g')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .text(d => d.label)
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .attr('dy', 4);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      label
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    function handleClick(event, d) {
        setSelectedNodes(prev => {
          if (prev.includes(d.id)) return prev;
          const updated = [...prev, d.id].slice(-2);
          if (updated.length === 2) {
            analyzePairing(updated[0], updated[1])
              .then(res => {
                console.log('분석 결과:', res.data);
                setAnalysisResult(res.data); // 🔥 전달
              })
              .catch(err => {
                console.error('분석 실패:', err);
                setAnalysisResult(null);
              });
          }
          return updated;
        });
      }

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

  }, [data, selectedNodes]);

  return <svg ref={ref} width={600} height={400} style={{ border: '1px solid #ccc', marginTop: '20px' }} />;
};

export default GraphCanvas;
