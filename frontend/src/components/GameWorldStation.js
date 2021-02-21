import React from 'react'

export default function GameWorldStation() {
  return (
    // <div>
    // <sb-content role="main" id="challenges">
    <div className="sb-categoryList">
      <div className="sb-category sb-table" data-id="The Deck" data-sb="true" data-type="sb-category" data-unsorted="true">
          <h2><sb-var data-var="id">Use cases</sb-var></h2>
          <div data-id="misc-magic" data-sb="true" data-type="sb-task" data-solved="true" data-name="Requirement Analysis" data-description="file -P name=1000 -m flag.mgc the_flag.txt" data-label="easy" data-click="setTaskActive/true" data-submit="submitFlag" className="sb-task glow-border">
            <sb-task-details role="button">
              <h4><sb-var data-var="name">Requirement Analysis</sb-var></h4>
              <sb-meta>
                <sb-var data-var="label">easy</sb-var>
              </sb-meta>
            </sb-task-details>
            <sb-task-stats>
              <h3><sb-var data-var="points">100</sb-var>pt</h3>
              
            </sb-task-stats>
          </div>
          <div data-id="misc-magic" data-sb="true" data-type="sb-task" data-name="Requirement Analysis" data-description="file -P name=1000 -m flag.mgc the_flag.txt" data-label="easy" data-click="setTaskActive/true" data-submit="submitFlag" className="sb-task glow-border">
            <sb-task-details role="button">
              <h4><sb-var data-var="name">Risk Analysis</sb-var></h4>
              <sb-meta>
                <sb-var data-var="label">medium</sb-var>
              </sb-meta>
            </sb-task-details>
            <sb-task-stats>
              <h3><sb-var data-var="points">50</sb-var>pt</h3>
            </sb-task-stats>
          </div>
          <div style={{opacity: 0.5}} data-id="misc-magic" data-sb="true" data-type="sb-task" className="sb-task glow-border" data-unsorted="true" data-active="false">
            <sb-task-details role="button">
              <h4><sb-var data-var="name">Planning</sb-var></h4>
              <sb-meta>
                <sb-var data-var="label">hard</sb-var>
              </sb-meta>
            </sb-task-details>
            <sb-task-stats>
              <h3><sb-var data-var="points">150</sb-var>pt</h3>
            </sb-task-stats>
          </div>
          <div disabled style={{textAlign: "center", boxShadow: "0 0 var(--glow-border-blur) var(--glow-border-width) grey, inset 0 0 var(--glow-border-blur) var(--glow-border-width) grey", border: "var(--glow-border-width) solid grey", color: "grey", backgroundColor: "grey", opacity: 0.5}} data-id="misc-magic" data-sb="true" data-type="sb-task" className="sb-task glow-border" data-unsorted="true" data-active="false">
            <sb-task-details role="button" style={{alignItems: "center"}}>
              <h4><sb-var data-var="name">Next Chapter</sb-var></h4>
            </sb-task-details>
          </div>
      </div>
    </div>
      // </sb-content>
    // </div>
  )
}
