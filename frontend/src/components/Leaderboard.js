import React from 'react'

export default function Leaderboard() {
  return (
    // <div>
      <div className="content" role="main" id="teams">
        <div className="sb-table sb-teamlist" data-sort-by="rank" data-unsorted="false">
          <div className="sb-table-head">
            <h2>Players</h2>
            <div className="dashed sb-spacer"></div>
            <h3>Ranking</h3>
          </div>
          <div className="sb-table-head">
            <h4>Place</h4>
            <h4># Tasks</h4>
            <h4 className="sb-spacer">Name</h4>
            <h4>Score</h4>
          </div>
          <div data-id="PPP" data-sb="true" data-type="sb-team" data-task-summary="17 tasks" data-tasks="crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" title="Solved tasks: crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" data-last="1540747499507" data-score="3350" data-rank="1" data-top100="true" data-top10="true" style={{"--rank":1}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="1">
            <span><sb-var data-var="rank">1</sb-var></span>
            <span><sb-var data-var="taskSummary">17 tasks</sb-var></span>
            <span><sb-var data-var="id">PPP</sb-var></span>
            <span><sb-var data-var="score">3350</sb-var></span>
          </div>
          <div data-id="5BC" data-sb="true" data-type="sb-team" data-task-summary="16 tasks" data-tasks="crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,pwn-mitigator,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-mitigator,web-pwn-gdb-as-a-service,web-quinify" title="Solved tasks: crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,pwn-mitigator,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-mitigator,web-pwn-gdb-as-a-service,web-quinify" data-last="1540747482324" data-score="3050" data-rank="2" data-top100="true" data-top10="true" style={{"--rank":2}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="2">
            <span><sb-var data-var="rank">2</sb-var></span>
            <span><sb-var data-var="taskSummary">16 tasks</sb-var></span>
            <span><sb-var data-var="id">5BC</sb-var></span>
            <span><sb-var data-var="score">3050</sb-var></span>
          </div>
          <div data-id="pasten" data-sb="true" data-type="sb-team" data-task-summary="14 tasks" data-tasks="crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-secure-safe-1,misc-secure-safe-2,pwn-mitigator,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-pwn-gdb-as-a-service,web-quinify" title="Solved tasks: crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-secure-safe-1,misc-secure-safe-2,pwn-mitigator,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-pwn-gdb-as-a-service,web-quinify" data-last="1540734684699" data-score="2350" data-rank="3" data-top100="true" data-top10="true" style={{"--rank":3}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="3">
            <span><sb-var data-var="rank">3</sb-var></span>
            <span><sb-var data-var="taskSummary">14 tasks</sb-var></span>
            <span><sb-var data-var="id">pasten</sb-var></span>
            <span><sb-var data-var="score">2350</sb-var></span>
          </div>
          <div data-id="TokyoWesterns" data-sb="true" data-type="sb-team" data-task-summary="14 tasks" data-tasks="crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,pwn-mitigator,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-quinify" title="Solved tasks: crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,pwn-mitigator,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-quinify" data-last="1540748234306" data-score="2200" data-rank="4" data-top100="true" data-top10="true" style={{"--rank":4}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="4">
            <span><sb-var data-var="rank">4</sb-var></span>
            <span><sb-var data-var="taskSummary">14 tasks</sb-var></span>
            <span><sb-var data-var="id">TokyoWesterns</sb-var></span>
            <span><sb-var data-var="score">2200</sb-var></span>
          </div>
          <div data-id="Dragon Sector" data-sb="true" data-type="sb-team" data-task-summary="14 tasks" data-tasks="crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-pwn-gdb-as-a-service,web-quinify" title="Solved tasks: crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-pwn-gdb-as-a-service,web-quinify" data-last="1540750635720" data-score="2200" data-rank="5" data-top100="true" data-top10="true" style={{"--rank":5}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="5">
            <span><sb-var data-var="rank">5</sb-var></span>
            <span><sb-var data-var="taskSummary">14 tasks</sb-var></span>
            <span><sb-var data-var="id">Dragon Sector</sb-var></span>
            <span><sb-var data-var="score">2200</sb-var></span>
          </div>
          <div data-id="DEFKOR00T" data-sb="true" data-type="sb-team" data-task-summary="13 tasks" data-tasks="crypto-auth,misc-luckyheart,misc-magic,pwn-mitigator,pwn-mojo,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-pwn-gdb-as-a-service,web-quinify" title="Solved tasks: crypto-auth,misc-luckyheart,misc-magic,pwn-mitigator,pwn-mojo,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-pwn-gdb-as-a-service,web-quinify" data-last="1540741788243" data-score="2150" data-rank="6" data-top100="true" data-top10="true" style={{"--rank":6}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="6">
            <span><sb-var data-var="rank">6</sb-var></span>
            <span><sb-var data-var="taskSummary">13 tasks</sb-var></span>
            <span><sb-var data-var="id">DEFKOR00T</sb-var></span>
            <span><sb-var data-var="score">2150</sb-var></span>
          </div>
          <div data-id="LeaveCat-PLUS" data-sb="true" data-type="sb-team" data-task-summary="13 tasks" data-tasks="crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,pwn-scudo,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-pwn-gdb-as-a-service,web-quinify" title="Solved tasks: crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,pwn-scudo,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-pwn-gdb-as-a-service,web-quinify" data-last="1540747256522" data-score="2000" data-rank="7" data-top100="true" data-top10="true" style={{"--rank":7}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="7">
            <span><sb-var data-var="rank">7</sb-var></span>
            <span><sb-var data-var="taskSummary">13 tasks</sb-var></span>
            <span><sb-var data-var="id">LeaveCat-PLUS</sb-var></span>
            <span><sb-var data-var="score">2000</sb-var></span>
          </div>
          <div data-id="!SpamAndHex" data-sb="true" data-type="sb-team" data-task-summary="11 tasks" data-tasks="crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-js-safe-3" title="Solved tasks: crypto-auth,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-js-safe-3" data-last="1540748065364" data-score="1550" data-rank="8" data-top100="true" data-top10="true" style={{"--rank":8}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="8">
            <span><sb-var data-var="rank">8</sb-var></span>
            <span><sb-var data-var="taskSummary">11 tasks</sb-var></span>
            <span><sb-var data-var="id">!SpamAndHex</sb-var></span>
            <span><sb-var data-var="score">1550</sb-var></span>
          </div>
          <div data-id="*Æ*" data-sb="true" data-type="sb-team" data-task-summary="9 tasks" data-tasks="misc-distributed,pwn-mitigator,pwn-scudo,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss" title="Solved tasks: misc-distributed,pwn-mitigator,pwn-scudo,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss" data-last="1540739869185" data-score="1450" data-rank="9" data-top100="true" data-top10="true" style={{"--rank":9}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="9">
            <span><sb-var data-var="rank">9</sb-var></span>
            <span><sb-var data-var="taskSummary">9 tasks</sb-var></span>
            <span><sb-var data-var="id">*Æ*</sb-var></span>
            <span><sb-var data-var="score">1450</sb-var></span>
          </div>
          <div data-id="p4" data-sb="true" data-type="sb-team" data-task-summary="8 tasks" data-tasks="crypto-auth,misc-luckyheart,misc-polyglot,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss" title="Solved tasks: crypto-auth,misc-luckyheart,misc-polyglot,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss" data-last="1540744066527" data-score="800" data-rank="10" data-top100="true" data-top10="true" style={{"--rank":10}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="10">
            <span><sb-var data-var="rank">10</sb-var></span>
            <span><sb-var data-var="taskSummary">8 tasks</sb-var></span>
            <span><sb-var data-var="id">p4</sb-var></span>
            <span><sb-var data-var="score">800</sb-var></span>
          </div>
        </div>
        <h4 className="sb-load-more" role="button" data-click="loadMore"></h4>
      </div>
    // </div>
  )
}
