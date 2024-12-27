import { BUILD_RESEARCH_STATION } from '../../actions/constants/BuildResearchStation';
import { DRIVE_FERRY } from '../../actions/constants/DriveFerry';
import { FLY } from '../../actions/constants/Fly';
import { SHARE_KNOWLEDGE } from '../../actions/constants/ShareKnowledge';
import { TREAT_DISEASE } from '../../actions/constants/Treat';
import { Role } from '../../types/Role';

export const BASIC_ROLES: Role[] = [
  {
    name: 'Medic',
    description:
      'Removes all diseases of the same color in the city when treating. Once a cure is generated, automatically treats diseases of that color upon arriving to the city.',
    actions: [DRIVE_FERRY, FLY, BUILD_RESEARCH_STATION, TREAT_DISEASE, SHARE_KNOWLEDGE],
  },
  {
    name: 'Scientist',
    description: 'Only needs 4 city cards of the same disease color to create a cure.',
    actions: [DRIVE_FERRY, FLY, BUILD_RESEARCH_STATION, TREAT_DISEASE, SHARE_KNOWLEDGE],
  },
  {
    name: 'Researcher',
    description:
      'Can share any city card with any other player in the same city using the share knowledge action (not limited to the card of the city where the players are located).',
    actions: [DRIVE_FERRY, FLY, BUILD_RESEARCH_STATION, TREAT_DISEASE, SHARE_KNOWLEDGE],
  },
  {
    name: 'Dispatcher',
    description: 'Can move other players pieces as if they are your own.',
    actions: [DRIVE_FERRY, FLY, BUILD_RESEARCH_STATION, TREAT_DISEASE, SHARE_KNOWLEDGE],
  },
  {
    name: 'Quarantine Specialist',
    description:
      "Prevents placement of a disease in the player's city or any cities connected to it.",
    actions: [DRIVE_FERRY, FLY, BUILD_RESEARCH_STATION, TREAT_DISEASE, SHARE_KNOWLEDGE],
  },
];
