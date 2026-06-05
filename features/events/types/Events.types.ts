import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from "@expo/vector-icons/AntDesign";

export interface Customer {
  id?: number;
  name: string;
  phone: string;
  email: string;
}

export interface EventType{
  id: number;
  name: string;
}

export interface Package{
  id: number;
  name: string;
}

export interface PaymentMethod{
  id: number;
  name: string;
}

export interface ReceiptType{
  id: number;
  name: string;
  ico: keyof typeof MaterialCommunityIcons.glyphMap;
}

export interface StatusType{
  id: number;
  name: string;
}

export interface Event{
  id?: number;
  name: string;
  location: string;
  start_datetime: string;
  end_datetime: string;
  description: string;

  event_customer: Customer;
  event_type: EventType;
  event_package: Package;

  total_cost: string;
  paid_amount: string;
  payment_method: PaymentMethod;
  receipt_type: ReceiptType;

  deleted: number;
  status: StatusType; 
  services: EventService[];
  schedule: EventSchedule[];
  staff: EventStaff[];
  equipment: EventEquipment[];  
}

export interface EventSchedule{
  id?: number;
  title: string;
  start_time: string;
  end_time: string;
  event: number;
}

export interface Service{
  id: number;
  name: string;
  price: string;
  description: string;
}

export interface EventService{
  id?: number;
  event: number;
  service: Service;
  quantity: number;
}

export interface Equipment{
  id: number;
  name: string;
  total_quantity: number;
  available_quantity: number;
}

export interface EventEquipment{
  id?: number;
  event: number;
  equipment: Equipment;
  quantity: number;
}

export interface Staff{
  id: number;
  name: string;
  phone: string;
}

export interface EventStaff{
  id?: number;
  event: number;
  staff: Staff;
  role: string;
}

export type EventListItem = {
  id: number;
  name: string;
  date: string;
  location: string;
  type: number;
};

export type DropdownItem = {
  label: string;
  value: string;
};

// Para CardHeader UI
export type PropsTextTitle = {
  title: string;
  icono: keyof typeof Ionicons.glyphMap;
}

export type PropsTextAction = {
  title?: string;
  icono?: keyof typeof MaterialIcons.glyphMap;
  onPress?: () => void;
}

//Para FinancialBox
export type PropsFinancialBox ={
  backgroundColor: string;
  icono: keyof typeof MaterialIcons.glyphMap;
  title: string;
  value: string | number;
}

export type PropsHeadTitle={
  titleTex: string;
  iconoTitle: keyof typeof Ionicons.glyphMap;
  titleTextAction?: string;
  iconoAction?: keyof typeof MaterialIcons.glyphMap;
  onPress?: () => void;
}

export type PropsSearchBar={
  filterText: string;
  setFilterText: (text: string) => void,
}

export type PropsInfoRow={
  icono: keyof typeof EvilIcons.glyphMap;
  text: string;
}

export type PropsActionButton={
  title: string;
  icono: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  colorsButton: [string, string, string];
  color: string;
  readonly?: boolean | true;
}

//Para CustomHeader 
export type PropsCustomHeader = {
  icono1: keyof typeof Ionicons.glyphMap;
  onBack: () => void;
  icono2: keyof typeof Ionicons.glyphMap;
  onSave: () => void;
  icono3?: keyof typeof Ionicons.glyphMap;
  onDelete?: () => void;
  icono4?: keyof typeof Ionicons.glyphMap;
  onEdit?: () => void;
  title: string;
  subtitle: string;
  colors: [string, string, string];
  readonly?: boolean;
};

//Para CircleButton
export type PropsCircleButton ={
  icono: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  colorIcono: string;
  backgroundColor: string;
  readonly?: boolean;
}

//Para HeadTitleDefault
export type PropsHeadTitleDefault ={
  color: string;
  title: string;
  subtitle: string;
  icono?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export type PropsHeadTitle2 ={
  icono: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  subtitle: string;
}

//Para CreateEventScreen
export type PropsInputText={
  title: string;
  icono: keyof typeof FontAwesome.glyphMap;
  colorIcono: string;
  color: string;
  placeholder: string;
  readonly: boolean | true;
}

// Para DropDownPick
export type PropsDropDownPick={
  title: string;
  icono: keyof typeof AntDesign.glyphMap;
  value: string | null;
  setValue: (value: string | null) => void;
  items: DropdownItem[];
  placeholder: string;
  zIndex: number;
  readonly:boolean;
}

//Para DateTimePick
export type PropDateTimePick={
  title: string;
  icono: keyof typeof MaterialCommunityIcons.glyphMap;
  mode: "date" | "time";
  value: Date;
  show: boolean;
  readonly: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
}

//Para ResumeServices
export type PropsResumeServices={
  icono: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  value: string;
  subTitle: string;
  valueCost: string;
}

//Para Services Table
export type PropsServicesTable = {
  services: EventService[],
  onDelete: (id: number) => void;
  readonly: boolean;
};

//Para Voucher Selector
export type PropsVoucherOption = {
  title: string;
  icono: keyof typeof MaterialCommunityIcons.glyphMap;
  selected: boolean;
  readonly: boolean;
  onPress: () => void;
};

//Para News Box
export type PropsNewsBox={
  title: string;
  icono: keyof typeof FontAwesome.glyphMap;
  backgroundColor: string;
  colorIcono: string;
}
//Para OutstandingBalance
export type PropsOutstandingBalance={
  title: string;
  icono: keyof typeof FontAwesome.glyphMap;
  backgroundColor: string;
  colorIcono: string;
  value:number,
}
//Para equipment table
export type PropsEquipmentTable = {
  equipments: EventEquipment[]; 
  onDelete: (id: number) => void;
  readonly: boolean;
};

//Para Staff table
export type PropsStaffTable = {
  staff: EventStaff[]; 
  onEdit: (staff: EventStaff) => void;
  onDelete: (id: number) => void;
  readonly: boolean;
};

//Para ScheduleList
export type PropsScheduleList = {
  schedules: EventSchedule[];
  onDelete: (id: number) => void;
  onEdit: (schedule: EventSchedule) => void;
  readonly: boolean;
}

//Para Step Client
export type PropsStepClient = {
  data: Partial<Event>;
  updateData: (data: Partial<Event>) => void;
  errors: any;
  readonly: boolean;
}

//Para Step Event
export type PropsStepEvent = {
  data: Partial<Event>;
  updateData: (data: Partial<Event>) => void;
  errors: any;
  readonly: boolean;
}

//Para Step Services
export type PropsStepServices = {
  data: Partial<Event>;
  updateData: (data: Partial<Event>) => void;
  errors: any;
  readonly: boolean;
}

//Para Step Financial
export type PropsStepFinancial = {
  data: Partial<Event>;
  updateData: (data: Partial<Event>) => void;
  errors: any;
  readonly: boolean;
}

//Para VoucherSelector
export type PropsVoucherSelector = {
  valueSelected: string;
  updateData: (data: Partial<Event>) => void;
  readonly: boolean;
}

//Para SepLogistic
export type PropsStepLogistic = {
  data: Partial<Event>;
  updateData: (data: Partial<Event>) => void;
  readonly: boolean;
}

//Para Step Schedule
export type PropsStepSchedule = {
  data: Partial<Event>;
  updateData: (data: Partial<Event>) => void;
  readonly: boolean;
}

//Para Step Resume
export type PropsStepResume = {
  data: Partial<Event>;
  updateData: (data: Partial<Event>) => void;
}

//Props de EventForm
export type PropsEventForm = {
  initialData?: Partial<Event>;
  mode: "create" | "edit" | "view";
  onSubmit: (event: Event) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  titleText: string;
}