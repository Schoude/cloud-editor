/**
 * The version of the data format. This corresponds to the tag in the git repository.
 */
export type TheVersionSchema = string;
/**
 * The id of a model inside the database.
 */
export type TheModelIDSchema = string;
/**
 * A globally unique identifier. See https://en.wikipedia.org/wiki/Universally_unique_identifier for more details.
 */
export type TheGUIDSchema = string;
/**
 * The style target describes how styles should be applied for a project.
 */
export type TheStyleTargetType = 'UNIT' | 'ROOM';
/**
 * A group of attributes by which to describe units, e.g.: Building, Floor, etc.
 */
export type TheUnitAttributeGroupSchema = {
  [k: string]: unknown;
};
/**
 * A 1:1 relation to another object with a guid. This guid is not unique, but rather a reference to another object.
 */
export type TheGUIDSingleRelationSchema = string;
/**
 * The index by which to sort elements.
 */
export type TheSortIndexSchema = number;
/**
 * The availability status of a unit. One of ['UNAVAILABLE', 'AVAILABLE', 'RESERVED', 'SOLD'].
 */
export type TheUnitAvailabilitySchema =
  | 'UNAVAILABLE'
  | 'AVAILABLE'
  | 'RESERVED'
  | 'SOLD';
/**
 * The base price of the unit. Currency independent.
 */
export type TheBasePriceSchema = number;
/**
 * The rooms (either image relevant or configurable) that this unit has. This may differ from the real room amount of the unit.
 */
export type TheGUIDMultiRelationSchema = TheGUIDSchema[];
/**
 * Extras group that a unit can have which are not bound to specific rooms. For example security packages, parking space.
 */
export type TheGUIDMultiRelationSchema1 = TheGUIDSchema[];
/**
 * Relations to attributes of this unit, for example: third floor, building 1.1.
 */
export type TheGUIDMultiRelationSchema2 = TheGUIDSchema[];
/**
 * The reference to the unit this unit is visualized by. Only units that have a reference to another unit are configurable. Units that have no reference are considered to be 'master' units, and are not visible.
 */
export type TheGUIDSingleRelationSchema1 = string;
/**
 * A 1:n relation to other objects with a guid. These guids are not unique, but rather are references to other objects.
 */
export type TheGUIDMultiRelationSchema3 = TheGUIDSchema[];
/**
 * The room's image id, used for sorting purposes.
 */
export type TheImageIDSchema = number;
/**
 * The variants in this room.
 */
export type TheGUIDMultiRelationSchema4 = TheGUIDSchema[];
/**
 * The reference to the room this room is visualized by. Only rooms that have a reference to another room are configurable. Rooms that have no reference are considered to be 'master' rooms.
 */
export type TheGUIDSingleRelationSchema2 = string;
/**
 * The camera type. One of ['STILL', 'PANO'].
 */
export type TheCameraTypeSchema = 'STILL' | 'PANO';
/**
 * The image id that is used to generate still and pano image urls.
 */
export type TheImageIDSchema1 = number;
/**
 * The primary room of this camera. This is usually the room the camera is located in. Used to get all cameras for a room.
 */
export type TheGUIDSingleRelationSchema3 = string;
/**
 * The secondary rooms of a camera, if present. Secondary rooms are rooms that the camera can see to from the location in it's primary room.
 */
export type TheGUIDMultiRelationSchema5 = TheGUIDSchema[];
/**
 * The selection type. One of ['FIXED', 'SINGLE', 'MULTI'].
 */
export type TheSelectionTypeSchema = 'FIXED' | 'SINGLE' | 'MULTI';
/**
 * Variants can have other variants as subselection.
 */
export type TheGUIDMultiRelationSchema6 = TheGUIDSchema[];
/**
 * The rooms to listen for selected variants. The variants are not necessarily applied to the rooms in this list, this list only describes the rooms to listen for changes.
 */
export type TheGUIDMultiRelationSchema7 = TheGUIDSchema[];
/**
 * The variants that control (when selected) which other variants are visible in a room.
 */
export type TheGUIDMultiRelationSchema8 = TheGUIDSchema[];
/**
 * The room in which these variants are visible.
 */
export type TheGUIDSingleRelationSchema4 = string;
/**
 * The variants to show. These variants are only visible if a variant of the variant dependency item is selected.
 */
export type TheGUIDMultiRelationSchema9 = TheGUIDSchema[];
/**
 * The defaults for the visible variants. Defaults in this list have to be present for every style present in the variantGuid array.
 */
export type TheGUIDMultiRelationSchema10 = TheGUIDSchema[];
/**
 * The default styles to apply to either units or rooms, depending on the style target.
 */
export type TheDefaultStyleSchema =
  | {
      [k: string]: unknown;
    }
  | {
      [k: string]: unknown;
    };
/**
 * The variants that are grouped.
 */
export type TheGUIDMultiRelationSchema11 = TheGUIDSchema[];

export interface TheInrealCloudPropertySchema {
  version: TheVersionSchema;
  globalConfig: TheGlobalConfigSchema;
  unitAttributeGroups?: TheUnitAttributeGroupSchema[];
  unitAttributes?: TheUnitAttributeSchema[];
  units: TheUnitSchema[];
  extras?: TheExtraSchema[];
  rooms: TheRoomSchema[];
  cameras: TheCameraSchema[];
  options: TheOptionSchema[];
  styles: TheStyleSchema[];
  variants: TheVariantSchema[];
  boundOptions?: TheBoundOptionSchema[];
  defaultOptionVariants: TheDefaultOptionVariantSchema[];
  variantDependencies?: TheVariantDependencySchema[];
  boundVariants?: TheBoundVariantSchema[];
  defaultStyles?: TheDefaultStyleSchema[];
  boundStyles?: TheBoundStyleSchema[];
  variantGroups?: TheVariantGroupSchema[];
}
/**
 * Configuration options that are applicable to the whole project.
 */
export interface TheGlobalConfigSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  styleTarget: TheStyleTargetType;
}
/**
 * A concrete unit attribute, assigned to a group, e.g.: Building A, Ground floor, etc.
 */
export interface TheUnitAttributeSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  unitAttributeGroupGuid: TheGUIDSingleRelationSchema;
  sortIndex?: TheSortIndexSchema;
  meta: TheMetaSchema;
}
/**
 * An object with all meta information, per language key, for a dataset. This is usually everything that can be localized. A 'default' key is required for the default language.
 */
export interface TheMetaSchema {
  [k: string]: TheLocalizationObjectSchema;
}
/**
 * An object containing all localized fields for a given language. Keys are camelCase, values are either string, integer, or number.
 *
 * This interface was referenced by `TheMetaSchema`'s JSON-Schema definition
 * via the `patternProperty` ".*".
 */
export interface TheLocalizationObjectSchema {
  /**
   * This interface was referenced by `TheLocalizationObjectSchema`'s JSON-Schema definition
   * via the `patternProperty` ".*".
   */
  [k: string]: string | number | number;
}
/**
 * A unit is a datatype that can be configured.
 */
export interface TheUnitSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  status: TheUnitAvailabilitySchema;
  basePrice?: TheBasePriceSchema;
  roomGuids?: TheGUIDMultiRelationSchema;
  extraGuids?: TheGUIDMultiRelationSchema1;
  unitAttributeGuids?: TheGUIDMultiRelationSchema2;
  unitReferenceGuid?: TheGUIDSingleRelationSchema1;
  /**
   * If this unit is an original unit. Which means if this unit's visualization is physically correct.
   */
  originalUnit?: boolean;
  sortIndex?: TheSortIndexSchema;
  meta: TheMetaSchema;
}
/**
 * A datatype which holds all configurated objects, that can globally be configured for a unit, e.g.: security packages.
 */
export interface TheExtraSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  variantGuids?: TheGUIDMultiRelationSchema3;
  sortIndex?: TheSortIndexSchema;
  meta: TheMetaSchema;
}
/**
 * A datatype that belongs to a unit and can be configured. A unit can have a unique set of rooms, or rooms can be shared between units if price calculation is not needed.
 */
export interface TheRoomSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  imageId: TheImageIDSchema;
  variantGuids: TheGUIDMultiRelationSchema4;
  roomReferenceGuid?: TheGUIDSingleRelationSchema2;
  sortIndex?: TheSortIndexSchema;
  meta: TheMetaSchema;
}
/**
 * A datatype that belongs to a room and holds information on how to render a scene.
 */
export interface TheCameraSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  type: TheCameraTypeSchema;
  imageId: TheImageIDSchema1;
  primaryRoomGuid: TheGUIDSingleRelationSchema3;
  secondaryRoomGuids?: TheGUIDMultiRelationSchema5;
  sortIndex?: TheSortIndexSchema;
  meta: TheMetaSchema;
}
/**
 * A datatype by which variants are grouped.
 */
export interface TheOptionSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  selectionType: TheSelectionTypeSchema;
  sortIndex?: TheSortIndexSchema;
  meta: TheMetaSchema;
}
/**
 * The style that a variant can have.
 */
export interface TheStyleSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  sortIndex: TheSortIndexSchema;
  meta: TheMetaSchema;
}
/**
 * A datatype that represents a configurable asset inside a unit.
 */
export interface TheVariantSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  imageId: TheImageIDSchema1;
  optionGuid: TheGUIDSingleRelationSchema;
  styleGuids: TheGUIDMultiRelationSchema3;
  variantGuids?: TheGUIDMultiRelationSchema6;
  sortIndex?: TheSortIndexSchema;
  meta: TheMetaSchema;
}
/**
 * Options that should be grouped for multiple rooms. If variants are selected for these options, they change the variant in the option for every room. Bound options have no effect on the generated image name string.
 */
export interface TheBoundOptionSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  roomGuids: TheGUIDMultiRelationSchema3;
  optionGuids: TheGUIDMultiRelationSchema3;
  sortIndex?: TheSortIndexSchema;
  meta: TheMetaSchema;
}
/**
 * Specifies the default variant for an option + style combination.
 */
export interface TheDefaultOptionVariantSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  styleGuid: TheGUIDSingleRelationSchema;
  optionGuid: TheGUIDSingleRelationSchema;
  variantGuid: TheGUIDSingleRelationSchema;
}
/**
 * Specifies which variants are visible in a room when another variant is selected.
 */
export interface TheVariantDependencySchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  roomGuids: TheGUIDMultiRelationSchema7;
  variantGuids: TheGUIDMultiRelationSchema8;
  isDependencyFor: TheVariantDependencyItemSchema[];
}
/**
 * The actual list of visible variants that have a dependency on another variant.
 */
export interface TheVariantDependencyItemSchema {
  roomGuid: TheGUIDSingleRelationSchema4;
  variantGuids: TheGUIDMultiRelationSchema9;
  defaultVariantGuids: TheGUIDMultiRelationSchema10;
}
/**
 * Defines what variant is automatically selected when another variant in the same unit is selected. Can be in different options. This does not involve grouping.
 */
export interface TheBoundVariantSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  unitGuids: TheGUIDMultiRelationSchema3;
  variantGuids: TheGUIDMultiRelationSchema3;
}
/**
 * Defines what style is automatically selected in a room when a style is selected in a different room.
 */
export interface TheBoundStyleSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  roomGuids: TheGUIDMultiRelationSchema3;
}
/**
 * Defines which variants should be grouped under a common label. This is solely a UI feature and has no effect on the configuration.
 */
export interface TheVariantGroupSchema {
  id?: TheModelIDSchema;
  guid: TheGUIDSchema;
  variantGuids: TheGUIDMultiRelationSchema11;
  sortIndex?: TheSortIndexSchema;
  meta: TheMetaSchema;
}
