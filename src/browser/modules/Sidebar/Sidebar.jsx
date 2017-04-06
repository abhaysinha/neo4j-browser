/*
 * Copyright (c) 2002-2016 "Neo Technology,"
 * Network Engine for Objects in Lund AB [http://neotechnology.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component } from 'preact'
import { DISCONNECTED_STATE, CONNECTED_STATE, PENDING_STATE } from 'shared/modules/connections/connectionsDuck'
import DatabaseInfo from '../DatabaseInfo/DatabaseInfo'
import Favorites from './Favorites'
import Documents from './Documents'
import About from './About'
import TabNavigation from 'browser-components/TabNavigation/Navigation'
import Visible from 'browser-components/Visible'
import Settings from './Settings'
import BrowserSync from './../Sync/BrowserSync'
import {
  DatabaseIcon,
  FavoritesIcon,
  DocumentsIcon,
  CloudIcon,
  SettingsIcon,
  AboutIcon
} from 'browser-components/icons/Icons'

import MdFlashOn from 'react-icons/lib/md/flash-on'
import MdFlashOff from 'react-icons/lib/md/flash-off'
import Badge from 'browser-components/badge'

class Sidebar extends Component {
  render () {
    const openDrawer = this.props.openDrawer
    const onNavClick = this.props.onNavClick
    const DatabaseDrawer = DatabaseInfo
    const FavoritesDrawer = Favorites
    const DocumentsDrawer = Documents
    const SettingsDrawer = Settings
    const AboutDrawer = About
    const dbIcon = (isOpen) => (
      <div style={{position: 'relative'}}>
        <DatabaseIcon isOpen={isOpen} />
        <Visible if={this.props.connectionState === DISCONNECTED_STATE}>
          <Badge status='error'><MdFlashOff /></Badge>
        </Visible>
        <Visible if={this.props.connectionState === CONNECTED_STATE}>
          <Badge status='ok'><MdFlashOn /></Badge>
        </Visible>
        <Visible if={this.props.connectionState === PENDING_STATE}>
          <Badge status='warning'><MdFlashOff /></Badge>
        </Visible>
      </div>
    )
    const topNavItemsList = [
      {name: 'DB', icon: (isOpen) => dbIcon(isOpen), content: DatabaseDrawer},
      {name: 'Favorites', icon: (isOpen) => <FavoritesIcon isOpen={isOpen} />, content: FavoritesDrawer},
      {name: 'Documents', icon: (isOpen) => <DocumentsIcon isOpen={isOpen} />, content: DocumentsDrawer}
    ]
    const bottomNavItemsList = [
      {name: 'Sync', icon: (isOpen) => <CloudIcon isOpen={isOpen} />, content: BrowserSync},
      {name: 'Settings', icon: (isOpen) => <SettingsIcon isOpen={isOpen} />, content: SettingsDrawer},
      {name: 'About', icon: (isOpen) => <AboutIcon isOpen={isOpen} />, content: AboutDrawer}
    ]

    return (<TabNavigation
      openDrawer={openDrawer}
      onNavClick={onNavClick}
      topNavItems={topNavItemsList}
      bottomNavItems={bottomNavItemsList}
    />)
  }
}

export default Sidebar
