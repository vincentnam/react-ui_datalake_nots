import React, {useEffect, useRef, useState} from 'react';
import * as d3 from "d3";
import * as axios from "axios";








export default function D3Graph(props){

    const d3Container = useRef(null);
    const initialBooks = [
        {
            name: "Harry Potter and the Philosophers Stone",
            author: "J. K. Rowling",
            genre: "fantasy"
        },{
            name: "The Pedagogy of Freedom",
            author: "Bell hooks",
            genre: "non-fiction"
        },{
            name: "Harry Potter and the Chamber of Secrets",
            author: "J. K. Rowling",
            genre: "fantasy"
        },{
            name: "Gilgamesh",
            author: "Derrek Hines",
            genre: "poetry"
        }
    ]
    const [books, setBooks] = useState(initialBooks)

    useEffect(
        () => {

            async function get_data() {
                var data = await axios.get("http://localhost:5000/sensors_data").then(response => response.data)
                console.log(data)
                const width = 600;
                const height = 300;
                // const data = {
                //     links: [{source: "A", target: "B", value: 1}, {source: "B", "target": "C", value: 20}, {
                //         source: "C",
                //         target: "A",
                //         value: 3
                //     }],
                //     nodes: [{id: "A", group: "A"}, {id: "B", group: "B"}, {id: "C", group: "C"}]
                //
                // }
                const svg = d3.select(d3Container.current).append("svg").attr("viewBox", [0, 0, width, height]);

                function color() {
                };
                color = () => {
                    const scale = d3.scaleOrdinal(d3.schemeCategory10);
                    return d => scale(d.group);
                }

                function drag() {
                };
                drag = (simulation) => {

                    function dragstarted(event) {
                        if (!event.active) simulation.alphaTarget(0.3).restart();
                        event.subject.fx = event.subject.x;
                        event.subject.fy = event.subject.y;
                    }

                    function dragged(event) {
                        event.subject.fx = event.x;
                        event.subject.fy = event.y;
                    }

                    function dragended(event) {
                        if (!event.active) simulation.alphaTarget(0);
                        event.subject.fx = null;
                        event.subject.fy = null;
                    }

                    return d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended);
                }


                svg.style("border", "1px solid black")
                // Remove old D3 elements
                const links = data.links.map(d => Object.create(d));
                const nodes = data.nodes.map(d => Object.create(d));

                const simulation = d3.forceSimulation(nodes)
                    .force("link", d3.forceLink(links).id(d => d.id))
                    .force("charge", d3.forceManyBody())
                    .force("center", d3.forceCenter(width / 2, height / 2));


                const link = svg.append("g")
                    .attr("stroke", "#999")
                    .attr("stroke-opacity", 0.6)
                    .selectAll("line")
                    .data(links)
                    .join("line")
                    .attr("stroke-width", d => Math.sqrt(d.value));

                const node = svg.append("g")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 1.5)
                    .selectAll("circle")
                    .data(nodes)
                    .join("circle")
                    .attr("r", 5)
                    .attr("fill", color)
                    .call(drag(simulation));

                node.append("title")
                    .text(d => d.id);

                simulation.on("tick", () => {
                    link
                        .attr("x1", d => d.source.x)
                        .attr("y1", d => d.source.y)
                        .attr("x2", d => d.target.x)
                        .attr("y2", d => d.target.y);

                    node
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y);
                });

                // invalidation.then(() => simulation.stop());

                svg.exit()
                    .remove();
            }
            get_data()
        },

        /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
        [props.data, d3Container.current])






    return        <div
        className="d3-graph"

        ref={d3Container}
    />
}

